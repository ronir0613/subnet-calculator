"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocale } from "@/components/locale-provider";
import { getQuizTranslation } from "@/components/quiz/quiz-translations";

type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

type QuizSet = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

const quizSets: QuizSet[] = [
  {
    id: "basics",
    title: "Subnet basics",
    description: "Prefixes, masks, and address roles",
    questions: [
      { id: "b1", prompt: "What does the /24 in 192.168.1.0/24 tell you?", options: ["24 bits identify the network", "24 hosts fit in the subnet", "24 subnets are available", "The address has 24 octets"], answer: 0, explanation: "The prefix length counts the network bits. IPv4 addresses have 32 bits, so /24 leaves 8 bits for addresses within the subnet." },
      { id: "b2", prompt: "Which subnet mask matches a /26 prefix?", options: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"], answer: 2, explanation: "A /26 has 24 full network bits and two more in the final octet. The final octet is 11000000 in binary, or 192." },
      { id: "b3", prompt: "Which address is the network address in a standard IPv4 subnet?", options: ["The address with every host bit set to 1", "The address with every host bit set to 0", "The first address after the gateway", "Any address ending in .0"], answer: 1, explanation: "The network address marks the start of a subnet. Its host portion is all zeroes; it does not always end in .0." },
      { id: "b4", prompt: "How many usable host addresses are in a /30 subnet under the usual IPv4 rules?", options: ["1", "2", "4", "6"], answer: 1, explanation: "A /30 leaves two host bits, for four total addresses. The network and broadcast addresses leave two usable host addresses." },
      { id: "b5", prompt: "What does a router compare to decide whether a destination is on the local subnet?", options: ["The destination and source port numbers", "The network portion of the addresses using the subnet mask", "The last octet only", "The DNS names of both devices"], answer: 1, explanation: "The subnet mask identifies the network bits. A router compares the local and destination network portions to choose local delivery or routing." },
    ],
  },
  {
    id: "capacity",
    title: "Masks and capacity",
    description: "Convert prefixes and size a subnet",
    questions: [
      { id: "c1", prompt: "How many usable host addresses does a /27 provide under the usual IPv4 rules?", options: ["14", "30", "32", "62"], answer: 1, explanation: "A /27 leaves 5 host bits: 2⁵ gives 32 total addresses. Excluding the network and broadcast addresses leaves 30 usable hosts." },
      { id: "c2", prompt: "What is the dotted-decimal mask for /21?", options: ["255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0"], answer: 1, explanation: "A /21 fills two octets (16 bits) and five bits in the third octet. 11111000 is 248, giving 255.255.248.0." },
      { id: "c3", prompt: "What is the block size of a /29 subnet in the final octet?", options: ["4", "8", "16", "32"], answer: 1, explanation: "A /29 mask is 255.255.255.248. Subtract 248 from 256 to get a block size of 8 addresses." },
      { id: "c4", prompt: "Which is the smallest standard subnet that supports 500 usable host addresses?", options: ["/24", "/23", "/22", "/25"], answer: 1, explanation: "A /24 has 254 usable hosts, which is too few. A /23 has 9 host bits and 510 usable addresses." },
      { id: "c5", prompt: "What CIDR prefix matches 255.255.255.248?", options: ["/27", "/28", "/29", "/30"], answer: 2, explanation: "The first three octets contribute 24 one-bits. The final octet 248 is 11111000, adding five more for /29." },
    ],
  },
  {
    id: "ranges",
    title: "Find the subnet",
    description: "Calculate ranges from an IPv4 address",
    questions: [
      { id: "r1", prompt: "Which network contains 192.168.10.77/26?", options: ["192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26"], answer: 1, explanation: "A /26 advances by 64 in the final octet. The blocks start at 0, 64, 128, and 192; address 77 is in the block starting at 64." },
      { id: "r2", prompt: "What is the broadcast address for 192.168.10.77/26?", options: ["192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255"], answer: 2, explanation: "The block 192.168.10.64/26 ends just before the next block at .128, so its broadcast address is .127." },
      { id: "r3", prompt: "What is the first usable host in 192.168.10.77/26?", options: ["192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126"], answer: 1, explanation: "The network address is 192.168.10.64. The first usable host is one address after it: .65." },
      { id: "r4", prompt: "What is the last usable host in 192.168.10.77/26?", options: ["192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254"], answer: 0, explanation: "The broadcast address is 192.168.10.127. The last usable host is one address before it: .126." },
      { id: "r5", prompt: "How many usable host addresses are in 192.168.10.77/26?", options: ["30", "62", "64", "126"], answer: 1, explanation: "A /26 leaves 6 host bits, or 64 total addresses. The network and broadcast addresses are reserved, leaving 62 usable hosts." },
    ],
  },
  {
    id: "design",
    title: "Subnet design",
    description: "Capacity planning, VLSM, and special prefixes",
    questions: [
      { id: "d1", prompt: "What is the smallest standard subnet that supports 60 host devices?", options: ["/27", "/26", "/25", "/24"], answer: 1, explanation: "A /27 provides 30 usable hosts. A /26 provides 62, so it is the smallest prefix that fits 60 devices." },
      { id: "d2", prompt: "In VLSM planning, which requirement should you allocate first?", options: ["The subnet needing the fewest hosts", "The subnet needing the most hosts", "The subnet with the shortest name", "The subnet with the lowest gateway address"], answer: 1, explanation: "Allocate the largest host requirement first. This gives it a suitably large contiguous block and reduces the chance that small allocations fragment the address space." },
      { id: "d3", prompt: "Which mask matches a /23 prefix?", options: ["255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0"], answer: 0, explanation: "A /23 has 16 network bits plus seven in the third octet. 11111110 is 254, so the mask is 255.255.254.0." },
      { id: "d4", prompt: "What is the network address for 172.16.5.12/30?", options: ["172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15"], answer: 1, explanation: "A /30 has blocks of four addresses. In the final octet the blocks start at 0, 4, 8, 12, and so on, making .12 the network address." },
      { id: "d5", prompt: "How does a /31 prefix typically work on a point-to-point link?", options: ["It has 30 usable hosts", "Both addresses can be used as endpoints, with no broadcast address", "It has one host and one broadcast address", "It is reserved for multicast"], answer: 1, explanation: "On point-to-point links, both addresses in a /31 can be endpoint addresses. The traditional network and broadcast exclusions do not apply." },
    ],
  },
];

export function QuizContent() {
  const { locale } = useLocale();
  const copy = getQuizTranslation(locale);
  const [activeSetId, setActiveSetId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setChoice] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const activeSet = quizSets.find((set) => set.id === activeSetId);
  const activeSetCopy = activeSet ? copy?.sets[activeSet.id] : undefined;
  const question = activeSet?.questions[questionIndex];
  const questionCopy = question ? activeSetCopy?.questions[question.id] : undefined;
  const prompt = questionCopy?.prompt ?? question?.prompt;
  const options = questionCopy?.options ?? question?.options ?? [];
  const explanation = questionCopy?.explanation ?? question?.explanation;
  const correctCount = activeSet ? answers.filter((answer, index) => answer === activeSet.questions[index].answer).length : 0;
  const finished = Boolean(activeSet && questionIndex === activeSet.questions.length);

  function startSet(setId: string) {
    setActiveSetId(setId);
    setQuestionIndex(0);
    setChoice("");
    setChecked(false);
    setAnswers([]);
  }

  function checkAnswer() {
    if (!question || choice === "") return;
    setAnswers((current) => [...current.slice(0, questionIndex), Number(choice)]);
    setChecked(true);
  }

  function nextQuestion() {
    setQuestionIndex((current) => current + 1);
    setChoice("");
    setChecked(false);
  }

  return (
    <section aria-label={copy?.quizLabel ?? "Subnetting quiz"}>
      {!activeSet && (
        <div className="grid gap-3 sm:grid-cols-2">
          {quizSets.map((set) => (
            <Button
              className="h-auto min-h-24 w-full flex-col items-start justify-center whitespace-normal border-border bg-card px-4 py-3 text-left text-foreground shadow-none hover:bg-accent"
              key={set.id}
              onClick={() => startSet(set.id)}
              type="button"
              variant="outline"
            >
              <span className="font-medium text-foreground">{copy?.sets[set.id]?.title ?? set.title}</span>
              <span className="mt-1 text-sm text-muted-foreground">{copy?.sets[set.id]?.description ?? set.description}</span>
              <span className="mt-2 text-xs text-muted-foreground">{set.questions.length} {copy?.questionsLabel ?? "questions"}</span>
            </Button>
          ))}
        </div>
      )}

      {activeSet && !finished && question && (
        <div className="border border-border bg-card p-4 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>{activeSetCopy?.title ?? activeSet.title}</span>
            <span>{copy ? `${copy.questionLabel} ${questionIndex + 1} ${copy.questionOf} ${activeSet.questions.length}` : `Question ${questionIndex + 1} of ${activeSet.questions.length}`}</span>
          </div>
          <div className="mb-5 h-1 w-full bg-muted" role="progressbar" aria-label={copy?.progressLabel ?? "Quiz progress"} aria-valuemin={0} aria-valuemax={activeSet.questions.length} aria-valuenow={questionIndex + 1}>
            <div className="h-full bg-primary transition-[width]" style={{ width: `${((questionIndex + 1) / activeSet.questions.length) * 100}%` }} />
          </div>
          <h2 className="text-lg font-semibold leading-7 tracking-tight sm:text-xl">{prompt}</h2>
          <RadioGroup aria-label={prompt} className="mt-5 gap-2" value={choice} onValueChange={setChoice}>
            {options.map((option, index) => {
              const isCorrect = index === question.answer;
              const isWrongChoice = choice === String(index) && !isCorrect;
              const stateClass = checked && isCorrect
                ? "border-primary bg-primary/5"
                : checked && isWrongChoice
                  ? "border-destructive bg-destructive/5"
                  : "border-border bg-background hover:bg-accent";
              return (
                <label className={`flex min-h-12 cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm leading-5 transition-colors ${stateClass} ${checked ? "cursor-default" : ""}`} key={option}>
                  <RadioGroupItem className="shrink-0" disabled={checked} value={String(index)} />
                  <span>{option}</span>
                  {checked && isCorrect && <span className="ml-auto text-xs font-medium text-primary">{copy?.correctAnswer ?? "Correct answer"}</span>}
                  {checked && isWrongChoice && <span className="ml-auto text-xs font-medium text-destructive">{copy?.yourAnswer ?? "Your answer"}</span>}
                </label>
              );
            })}
          </RadioGroup>

          {checked && (
            <div className="mt-5 border-t border-border pt-4" aria-live="polite">
              <p className={`font-medium ${Number(choice) === question.answer ? "text-primary" : "text-destructive"}`}>
                {Number(choice) === question.answer ? copy?.right ?? "That’s right." : copy?.notQuite ?? "Not quite."}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{explanation}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={() => setActiveSetId(null)}>{copy?.allSets ?? "All quiz sets"}</Button>
            {checked ? (
              <Button onClick={nextQuestion}>{questionIndex === activeSet.questions.length - 1 ? copy?.seeResults ?? "See results" : copy?.nextQuestion ?? "Next question"}</Button>
            ) : (
              <Button disabled={choice === ""} onClick={checkAnswer}>{copy?.checkAnswer ?? "Check answer"}</Button>
            )}
          </div>
        </div>
      )}

      {activeSet && finished && (
        <div className="border border-border bg-card p-4 sm:p-6" aria-live="polite">
          <h2 className="text-2xl font-semibold tracking-tight">{copy?.setComplete ?? "Set complete"}</h2>
          <p className="mt-2 text-muted-foreground">{(copy?.resultSummary ?? "You got {score} of {total} correct in {set}.")
            .replace("{score}", String(correctCount))
            .replace("{total}", String(activeSet.questions.length))
            .replace("{set}", activeSetCopy?.title ?? activeSet.title)}</p>
          {correctCount < activeSet.questions.length && (
            <div className="mt-6 border-t border-border pt-4">
              <h3 className="font-medium">{copy?.reviewAnswers ?? "Review these answers"}</h3>
              <ol className="mt-3 space-y-4">
                {activeSet.questions.map((item, index) => answers[index] !== item.answer && (
                  <li className="text-sm leading-6" key={item.prompt}>
                    <p className="font-medium">{activeSetCopy?.questions[item.id]?.prompt ?? item.prompt}</p>
                    <p className="text-muted-foreground">{copy?.answer ?? "Answer:"} {activeSetCopy?.questions[item.id]?.options[item.answer] ?? item.options[item.answer]}. {activeSetCopy?.questions[item.id]?.explanation ?? item.explanation}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => startSet(activeSet.id)}>{copy?.retry ?? "Try this set again"}</Button>
            <Button variant="outline" onClick={() => setActiveSetId(null)}>{copy?.chooseAnother ?? "Choose another set"}</Button>
          </div>
        </div>
      )}
    </section>
  );
}
