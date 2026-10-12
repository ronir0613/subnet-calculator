import type { Locale } from "@/lib/i18n-shared";

export type QuizQuestionCopy = { prompt: string; options: string[]; explanation: string };
type QuizSetCopy = { title: string; description: string; questions: Record<string, QuizQuestionCopy> };
export type QuizTranslation = {
  pageTitle: string;
  pageIntro: string;
  needRefresher: string;
  readGuide: string;
  quizLabel: string;
  questionLabel: string;
  questionOf: string;
  progressLabel: string;
  questionsLabel: string;
  correctAnswer: string;
  yourAnswer: string;
  right: string;
  notQuite: string;
  allSets: string;
  checkAnswer: string;
  nextQuestion: string;
  seeResults: string;
  setComplete: string;
  resultSummary: string;
  reviewAnswers: string;
  answer: string;
  retry: string;
  chooseAnother: string;
  sets: Record<string, QuizSetCopy>;
};

type QuestionRow = [string, string, string, string, string, string];
type SetRows = { title: string; description: string; questions: QuestionRow[] };
type TranslationRows = Omit<QuizTranslation, "sets"> & { sets: Record<string, SetRows> };

export const quizTranslations: Record<Exclude<Locale, "en">, TranslationRows> = {
  zh: {
    pageTitle: "IPv4 子网测验", pageIntro: "选择一组题目，按自己的节奏作答，并查看每题解析。", needRefresher: "需要复习？", readGuide: "阅读子网指南",
    quizLabel: "子网测验", questionLabel: "第", questionOf: "题，共", progressLabel: "测验进度", questionsLabel: "道题", correctAnswer: "正确答案", yourAnswer: "你的答案", right: "答对了。", notQuite: "还差一点。", allSets: "所有题组", checkAnswer: "检查答案", nextQuestion: "下一题", seeResults: "查看结果", setComplete: "本组完成", resultSummary: "共答对 {score} 道题（共 {total} 道），题组：{set}。", reviewAnswers: "复习这些答案", answer: "答案：", retry: "再做一次", chooseAnother: "选择其他题组",
    sets: {
      basics: { title: "子网基础", description: "前缀、掩码和地址用途", questions: [
        ["192.168.1.0/24 中的 /24 表示什么？", "24 位用于标识网络", "子网可容纳 24 台主机", "有 24 个可用子网", "地址有 24 个八位组", "前缀长度表示网络位的数量。IPv4 地址共 32 位，因此 /24 留下 8 位用于子网内的地址。"],
        ["哪个子网掩码对应 /26？", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "/26 包含 24 个完整网络位，最后一个八位组再取两位。二进制 11000000 等于十进制 192。"],
        ["标准 IPv4 子网中的网络地址是什么？", "主机位全为 1 的地址", "主机位全为 0 的地址", "网关之后的第一个地址", "任何以 .0 结尾的地址", "网络地址标记子网的起点，其主机部分全为 0；它不一定以 .0 结尾。"],
        ["按常见 IPv4 规则，/30 子网有多少个可用主机地址？", "1", "2", "4", "6", "/30 留下 2 个主机位，共 4 个地址。扣除网络地址和广播地址后，剩下 2 个可用主机地址。"],
        ["路由器用什么来判断目标是否在本地子网？", "目标端口和源端口", "使用子网掩码比较地址的网络部分", "只比较最后一个八位组", "比较两台设备的 DNS 名称", "子网掩码标识网络位。路由器比较本地地址与目标地址的网络部分，以决定本地传递还是转发。"],
      ] },
      capacity: { title: "掩码与容量", description: "转换前缀并选择子网大小", questions: [
        ["按常见 IPv4 规则，/27 有多少个可用主机地址？", "14", "30", "32", "62", "/27 留下 5 个主机位，2⁵ 得到 32 个地址。扣除网络地址和广播地址后，可用主机数为 30。"],
        ["/21 对应哪个点分十进制掩码？", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0", "/21 包含两个完整八位组（16 位）和第三个八位组的 5 位。11111000 等于 248，因此掩码为 255.255.248.0。"],
        ["/29 子网在最后一个八位组中的块大小是多少？", "4", "8", "16", "32", "/29 的掩码是 255.255.255.248。用 256 减去 248，块大小为 8 个地址。"],
        ["支持 500 个可用主机地址的最小标准子网是哪一个？", "/24", "/23", "/22", "/25", "/24 只有 254 个可用主机，容量不足。/23 有 9 个主机位，可提供 510 个可用地址。"],
        ["255.255.255.248 对应哪个 CIDR 前缀？", "/27", "/28", "/29", "/30", "前三个八位组包含 24 个 1。最后一个八位组 248 的二进制是 11111000，再增加 5 位，因此是 /29。"],
      ] },
      ranges: { title: "查找子网", description: "根据 IPv4 地址计算地址范围", questions: [
        ["192.168.10.77/26 属于哪个网络？", "192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26", "/26 在最后一个八位组中每 64 个地址递增。网段从 0、64、128、192 开始，77 位于从 64 开始的网段。"],
        ["192.168.10.77/26 的广播地址是什么？", "192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255", "192.168.10.64/26 网段在下一个网段 .128 之前结束，因此广播地址是 .127。"],
        ["192.168.10.77/26 中第一个可用主机地址是什么？", "192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126", "网络地址是 192.168.10.64。第一个可用主机地址比它大 1，即 .65。"],
        ["192.168.10.77/26 中最后一个可用主机地址是什么？", "192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254", "广播地址是 192.168.10.127。最后一个可用主机地址比它小 1，即 .126。"],
        ["192.168.10.77/26 有多少个可用主机地址？", "30", "62", "64", "126", "/26 留下 6 个主机位，即 64 个地址。保留网络地址和广播地址后，剩下 62 个可用主机地址。"],
      ] },
      design: { title: "子网设计", description: "容量规划、VLSM 和特殊前缀", questions: [
        ["支持 60 台主机设备的最小标准子网是什么？", "/27", "/26", "/25", "/24", "/27 提供 30 个可用主机地址。/26 提供 62 个，因此它是满足 60 台设备需求的最小前缀。"],
        ["使用 VLSM 规划时，应先分配哪种需求？", "主机数最少的子网", "主机数最多的子网", "名称最短的子网", "网关地址最低的子网", "先分配主机需求最大的子网，可为其留出足够大的连续地址块，并降低小网段切碎地址空间的风险。"],
        ["哪个掩码对应 /23？", "255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0", "/23 包含 16 个网络位，第三个八位组再取 7 位。11111110 等于 254，因此掩码是 255.255.254.0。"],
        ["172.16.5.12/30 的网络地址是什么？", "172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15", "/30 每块有 4 个地址。最后一个八位组中的块从 0、4、8、12 等位置开始，所以 .12 是网络地址。"],
        ["/31 前缀在点对点链路上通常如何使用？", "有 30 个可用主机", "两个地址都可作为端点，且没有广播地址", "一个主机地址和一个广播地址", "专用于多播", "在点对点链路上，/31 中的两个地址都可以用作端点地址，不使用传统的网络地址和广播地址排除规则。"],
      ] },
    },
  },
  es: {
    pageTitle: "Cuestionario de subredes IPv4", pageIntro: "Elige un bloque, responde a tu ritmo y revisa la explicación de cada pregunta.", needRefresher: "¿Necesitas repasar?", readGuide: "Lee la guía de subredes",
    quizLabel: "Cuestionario de subredes", questionLabel: "Pregunta", questionOf: "de", progressLabel: "Progreso del cuestionario", questionsLabel: "preguntas", correctAnswer: "Respuesta correcta", yourAnswer: "Tu respuesta", right: "Correcto.", notQuite: "No exactamente.", allSets: "Todos los bloques", checkAnswer: "Comprobar respuesta", nextQuestion: "Siguiente pregunta", seeResults: "Ver resultados", setComplete: "Bloque completado", resultSummary: "Has acertado {score} de {total} preguntas en {set}.", reviewAnswers: "Repasa estas respuestas", answer: "Respuesta:", retry: "Repetir este bloque", chooseAnother: "Elegir otro bloque",
    sets: {
      basics: { title: "Fundamentos de subredes", description: "Prefijos, máscaras y funciones de las direcciones", questions: [
        ["¿Qué indica /24 en 192.168.1.0/24?", "24 bits identifican la red", "La subred admite 24 hosts", "Hay 24 subredes disponibles", "La dirección tiene 24 octetos", "La longitud del prefijo cuenta los bits de red. IPv4 tiene 32 bits, así que /24 deja 8 bits para las direcciones de la subred."],
        ["¿Qué máscara de subred corresponde a /26?", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "/26 tiene 24 bits de red completos y dos más en el último octeto. 11000000 en binario equivale a 192."],
        ["¿Qué dirección es la dirección de red en una subred IPv4 estándar?", "La dirección con todos los bits de host a 1", "La dirección con todos los bits de host a 0", "La primera dirección después de la puerta de enlace", "Cualquier dirección que termine en .0", "La dirección de red marca el inicio de la subred. Su parte de host contiene solo ceros; no siempre termina en .0."],
        ["Según las reglas IPv4 habituales, ¿cuántas direcciones de host utilizables tiene una subred /30?", "1", "2", "4", "6", "/30 deja dos bits de host, es decir, cuatro direcciones. Al excluir la red y la difusión quedan dos hosts utilizables."],
        ["¿Qué compara un router para saber si un destino está en la subred local?", "Los puertos de origen y destino", "La parte de red de las direcciones mediante la máscara", "Solo el último octeto", "Los nombres DNS de ambos equipos", "La máscara identifica los bits de red. El router compara las partes de red local y de destino para decidir si entrega localmente o enruta."],
      ] },
      capacity: { title: "Máscaras y capacidad", description: "Convierte prefijos y calcula tamaños", questions: [
        ["Según las reglas IPv4 habituales, ¿cuántos hosts utilizables ofrece /27?", "14", "30", "32", "62", "/27 deja 5 bits de host: 2⁵ son 32 direcciones. Al excluir la red y la difusión quedan 30 hosts utilizables."],
        ["¿Qué máscara decimal con puntos corresponde a /21?", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0", "/21 cubre dos octetos completos (16 bits) y cinco bits del tercero. 11111000 equivale a 248: 255.255.248.0."],
        ["¿Cuál es el tamaño de bloque de una subred /29 en el último octeto?", "4", "8", "16", "32", "La máscara /29 es 255.255.255.248. Resta 248 a 256 y obtienes bloques de 8 direcciones."],
        ["¿Cuál es la subred estándar más pequeña que admite 500 hosts utilizables?", "/24", "/23", "/22", "/25", "/24 solo ofrece 254 hosts utilizables. /23 deja 9 bits de host y permite 510 direcciones utilizables."],
        ["¿Qué prefijo CIDR corresponde a 255.255.255.248?", "/27", "/28", "/29", "/30", "Los tres primeros octetos aportan 24 bits a uno. 248 es 11111000, que añade cinco bits: /29."],
      ] },
      ranges: { title: "Encontrar la subred", description: "Calcula rangos a partir de una dirección IPv4", questions: [
        ["¿Qué red contiene 192.168.10.77/26?", "192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26", "/26 avanza de 64 en 64 en el último octeto. Los bloques empiezan en 0, 64, 128 y 192; la dirección 77 cae en el bloque que empieza en 64."],
        ["¿Cuál es la dirección de difusión de 192.168.10.77/26?", "192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255", "El bloque 192.168.10.64/26 termina justo antes del siguiente, que empieza en .128. Por eso, la difusión es .127."],
        ["¿Cuál es el primer host utilizable en 192.168.10.77/26?", "192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126", "La dirección de red es 192.168.10.64. El primer host utilizable es la siguiente: .65."],
        ["¿Cuál es el último host utilizable en 192.168.10.77/26?", "192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254", "La dirección de difusión es 192.168.10.127. El último host utilizable es la anterior: .126."],
        ["¿Cuántas direcciones de host utilizables tiene 192.168.10.77/26?", "30", "62", "64", "126", "/26 deja 6 bits de host, es decir, 64 direcciones. Al reservar la red y la difusión quedan 62 hosts utilizables."],
      ] },
      design: { title: "Diseño de subredes", description: "Planificación, VLSM y prefijos especiales", questions: [
        ["¿Cuál es la subred estándar más pequeña que admite 60 dispositivos?", "/27", "/26", "/25", "/24", "/27 ofrece 30 hosts utilizables. /26 ofrece 62, así que es el prefijo más pequeño que admite 60 dispositivos."],
        ["Al planificar con VLSM, ¿qué requisito debes asignar primero?", "La subred con menos hosts", "La subred con más hosts", "La subred con el nombre más corto", "La subred con la puerta de enlace más baja", "Asigna primero la mayor necesidad de hosts. Así obtiene un bloque contiguo suficientemente grande y se reduce la fragmentación del espacio de direcciones."],
        ["¿Qué máscara corresponde a /23?", "255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0", "/23 tiene 16 bits de red y siete en el tercer octeto. 11111110 equivale a 254, por lo que la máscara es 255.255.254.0."],
        ["¿Cuál es la dirección de red de 172.16.5.12/30?", "172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15", "Una /30 tiene bloques de cuatro direcciones. En el último octeto empiezan en 0, 4, 8, 12 y así sucesivamente; .12 es la dirección de red."],
        ["¿Cómo suele funcionar un prefijo /31 en un enlace punto a punto?", "Tiene 30 hosts utilizables", "Ambas direcciones pueden ser extremos, sin dirección de difusión", "Tiene un host y una dirección de difusión", "Está reservado para multidifusión", "En enlaces punto a punto, las dos direcciones de una /31 pueden usarse como extremos. No se aplican las exclusiones tradicionales de red y difusión."],
      ] },
    },
  },
  ar: {
    pageTitle: "اختبار شبكات IPv4 الفرعية", pageIntro: "اختر مجموعة، وأجب بالسرعة التي تناسبك، ثم راجع شرح كل سؤال.", needRefresher: "هل تحتاج إلى مراجعة؟", readGuide: "اقرأ دليل الشبكات الفرعية",
    quizLabel: "اختبار الشبكات الفرعية", questionLabel: "السؤال", questionOf: "من", progressLabel: "تقدم الاختبار", questionsLabel: "أسئلة", correctAnswer: "الإجابة الصحيحة", yourAnswer: "إجابتك", right: "إجابة صحيحة.", notQuite: "ليست صحيحة تمامًا.", allSets: "كل المجموعات", checkAnswer: "تحقق من الإجابة", nextQuestion: "السؤال التالي", seeResults: "عرض النتائج", setComplete: "اكتملت المجموعة", resultSummary: "أجبت إجابة صحيحة عن {score} من {total} أسئلة في {set}.", reviewAnswers: "راجع هذه الإجابات", answer: "الإجابة:", retry: "أعد هذه المجموعة", chooseAnother: "اختر مجموعة أخرى",
    sets: {
      basics: { title: "أساسيات الشبكات الفرعية", description: "البادئات والأقنعة وأدوار العناوين", questions: [
        ["ما دلالة /24 في 192.168.1.0/24؟", "24 بتًا تعرّف الشبكة", "تتسع الشبكة الفرعية لـ 24 مضيفًا", "تتوفر 24 شبكة فرعية", "يتكون العنوان من 24 ثمانية بت", "يحدد طول البادئة عدد بتات الشبكة. يتكون IPv4 من 32 بتًا، لذا يترك /24 ثمانية بتات لعناوين الشبكة الفرعية."],
        ["ما قناع الشبكة الفرعية المطابق للبادئة /26؟", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "تتضمن /26 عدد 24 بتًا كاملًا للشبكة وبتين إضافيين في الثماني الأخير. القيمة الثنائية 11000000 تساوي 192."],
        ["ما عنوان الشبكة في شبكة IPv4 فرعية قياسية؟", "العنوان الذي تكون فيه كل بتات المضيف 1", "العنوان الذي تكون فيه كل بتات المضيف 0", "أول عنوان بعد البوابة", "أي عنوان ينتهي بـ .0", "يمثل عنوان الشبكة بداية الشبكة الفرعية. تكون بتات المضيف فيه كلها أصفارًا، ولا يلزم أن ينتهي بـ .0."],
        ["وفق قواعد IPv4 المعتادة، كم عنوان مضيف قابلًا للاستخدام في شبكة /30؟", "1", "2", "4", "6", "تترك /30 بتين للمضيف، أي أربعة عناوين. بعد استثناء عنوان الشبكة والبث يتبقى عنوانان قابلان للاستخدام."],
        ["ما الذي يقارنه الموجّه لمعرفة إن كانت الوجهة ضمن الشبكة المحلية؟", "منافذ المصدر والوجهة", "جزء الشبكة من العناوين باستخدام القناع", "الثماني الأخير فقط", "أسماء DNS للجهازين", "يحدد القناع بتات الشبكة. يقارن الموجّه جزء الشبكة المحلي بجزء شبكة الوجهة ليقرر التسليم المحلي أو التوجيه."],
      ] },
      capacity: { title: "الأقنعة والسعة", description: "تحويل البادئات وحساب حجم الشبكة", questions: [
        ["وفق قواعد IPv4 المعتادة، كم مضيفًا قابلًا للاستخدام توفر /27؟", "14", "30", "32", "62", "تترك /27 خمسة بتات للمضيف، أي 2⁵ = 32 عنوانًا. بعد استثناء الشبكة والبث يتبقى 30 مضيفًا."],
        ["ما القناع العشري المنقّط للبادئة /21؟", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0", "تغطي /21 ثمانيتين كاملتين (16 بتًا) وخمسة بتات من الثماني الثالث. 11111000 تساوي 248، فيكون القناع 255.255.248.0."],
        ["ما حجم الكتلة لشبكة /29 في الثماني الأخير؟", "4", "8", "16", "32", "قناع /29 هو 255.255.255.248. اطرح 248 من 256 لتحصل على كتلة من 8 عناوين."],
        ["ما أصغر شبكة قياسية تدعم 500 عنوان مضيف قابلًا للاستخدام؟", "/24", "/23", "/22", "/25", "توفر /24 عدد 254 مضيفًا فقط. تترك /23 تسعة بتات للمضيف وتوفر 510 عناوين قابلة للاستخدام."],
        ["ما بادئة CIDR المطابقة للقناع 255.255.255.248؟", "/27", "/28", "/29", "/30", "تضيف الثمانيات الثلاثة الأولى 24 بتًا بقيمة 1. ويمثل 248 بالثنائي 11111000، أي خمسة بتات أخرى؛ لذلك البادئة /29."],
      ] },
      ranges: { title: "تحديد الشبكة الفرعية", description: "حساب النطاقات من عنوان IPv4", questions: [
        ["ما الشبكة التي تضم 192.168.10.77/26؟", "192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26", "تتقدم /26 بمقدار 64 في الثماني الأخير. تبدأ الكتل عند 0 و64 و128 و192؛ يقع العنوان 77 ضمن الكتلة التي تبدأ عند 64."],
        ["ما عنوان البث لـ 192.168.10.77/26؟", "192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255", "تنتهي الكتلة 192.168.10.64/26 قبل الكتلة التالية التي تبدأ عند .128، لذا عنوان البث هو .127."],
        ["ما أول عنوان مضيف قابل للاستخدام في 192.168.10.77/26؟", "192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126", "عنوان الشبكة هو 192.168.10.64. أول مضيف قابل للاستخدام هو العنوان التالي: .65."],
        ["ما آخر عنوان مضيف قابل للاستخدام في 192.168.10.77/26؟", "192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254", "عنوان البث هو 192.168.10.127. آخر مضيف قابل للاستخدام يسبقه مباشرة: .126."],
        ["كم عنوان مضيف قابلًا للاستخدام في 192.168.10.77/26؟", "30", "62", "64", "126", "تترك /26 ستة بتات للمضيف، أي 64 عنوانًا. بعد حجز عنوان الشبكة والبث يتبقى 62 عنوانًا قابلًا للاستخدام."],
      ] },
      design: { title: "تصميم الشبكات الفرعية", description: "تخطيط السعة وVLSM والبادئات الخاصة", questions: [
        ["ما أصغر شبكة فرعية قياسية تدعم 60 جهازًا؟", "/27", "/26", "/25", "/24", "توفر /27 عدد 30 مضيفًا. وتوفر /26 عدد 62، لذا فهي أصغر بادئة تستوعب 60 جهازًا."],
        ["عند التخطيط باستخدام VLSM، أي احتياج تخصصه أولًا؟", "الشبكة التي تحتاج أقل عدد من المضيفين", "الشبكة التي تحتاج أكبر عدد من المضيفين", "الشبكة ذات الاسم الأقصر", "الشبكة ذات أدنى عنوان بوابة", "ابدأ بأكبر احتياج للمضيفين. فهذا يضمن كتلة متصلة كبيرة بما يكفي ويقلل تجزئة مساحة العناوين بسبب التخصيصات الصغيرة."],
        ["ما القناع المطابق للبادئة /23؟", "255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0", "تتضمن /23 عدد 16 بتًا للشبكة وسبعة في الثماني الثالث. 11111110 تساوي 254، لذلك القناع 255.255.254.0."],
        ["ما عنوان الشبكة لـ 172.16.5.12/30؟", "172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15", "تضم /30 كتلًا من أربعة عناوين. تبدأ الكتل في الثماني الأخير عند 0 و4 و8 و12؛ لذا .12 هو عنوان الشبكة."],
        ["كيف تُستخدم البادئة /31 عادةً على وصلة من نقطة إلى نقطة؟", "توفر 30 مضيفًا قابلًا للاستخدام", "يمكن استخدام العنوانين كنقطتي اتصال دون عنوان بث", "تحتوي على مضيف واحد وعنوان بث", "مخصصة للبث المتعدد", "على وصلات نقطة إلى نقطة، يمكن استخدام عنواني /31 كنقطتي اتصال. ولا تنطبق استثناءات عنوان الشبكة والبث التقليدية."],
      ] },
    },
  },
  id: {
    pageTitle: "Kuis subnet IPv4", pageIntro: "Pilih satu set, jawab dengan tempo sendiri, lalu pelajari penjelasan tiap soal.", needRefresher: "Perlu mengulang materi?", readGuide: "Baca panduan subnet",
    quizLabel: "Kuis subnet", questionLabel: "Soal", questionOf: "dari", progressLabel: "Progres kuis", questionsLabel: "soal", correctAnswer: "Jawaban benar", yourAnswer: "Jawaban Anda", right: "Benar.", notQuite: "Belum tepat.", allSets: "Semua set kuis", checkAnswer: "Periksa jawaban", nextQuestion: "Soal berikutnya", seeResults: "Lihat hasil", setComplete: "Set selesai", resultSummary: "Anda menjawab {score} dari {total} soal dengan benar pada {set}.", reviewAnswers: "Pelajari jawaban ini", answer: "Jawaban:", retry: "Ulangi set ini", chooseAnother: "Pilih set lain",
    sets: {
      basics: { title: "Dasar subnet", description: "Prefix, mask, dan fungsi alamat", questions: [
        ["Apa arti /24 pada 192.168.1.0/24?", "24 bit menunjukkan jaringan", "Subnet dapat menampung 24 host", "Tersedia 24 subnet", "Alamat memiliki 24 oktet", "Panjang prefix menghitung bit jaringan. IPv4 memiliki 32 bit, jadi /24 menyisakan 8 bit untuk alamat di dalam subnet."],
        ["Subnet mask mana yang cocok dengan prefix /26?", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "/26 memiliki 24 bit jaringan penuh dan dua bit lagi di oktet terakhir. Nilai biner 11000000 adalah 192."],
        ["Alamat mana yang menjadi alamat jaringan pada subnet IPv4 standar?", "Alamat dengan semua bit host bernilai 1", "Alamat dengan semua bit host bernilai 0", "Alamat pertama setelah gateway", "Alamat apa pun yang berakhir dengan .0", "Alamat jaringan menandai awal subnet. Bagian host-nya berisi nol semua; alamat ini tidak selalu berakhir dengan .0."],
        ["Menurut aturan IPv4 umum, berapa alamat host yang dapat digunakan dalam subnet /30?", "1", "2", "4", "6", "/30 menyisakan dua bit host atau empat alamat. Setelah alamat jaringan dan broadcast dikecualikan, tersisa dua host yang dapat digunakan."],
        ["Apa yang dibandingkan router untuk menentukan apakah tujuan berada di subnet lokal?", "Port sumber dan tujuan", "Bagian jaringan alamat dengan subnet mask", "Oktet terakhir saja", "Nama DNS kedua perangkat", "Subnet mask menandai bit jaringan. Router membandingkan bagian jaringan lokal dan tujuan untuk memilih pengiriman lokal atau perutean."],
      ] },
      capacity: { title: "Mask dan kapasitas", description: "Konversi prefix dan hitung ukuran subnet", questions: [
        ["Menurut aturan IPv4 umum, berapa host yang dapat digunakan pada /27?", "14", "30", "32", "62", "/27 menyisakan 5 bit host: 2⁵ menghasilkan 32 alamat. Setelah alamat jaringan dan broadcast dikecualikan, tersisa 30 host."],
        ["Apa subnet mask desimal bertitik untuk /21?", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0", "/21 mencakup dua oktet penuh (16 bit) dan lima bit pada oktet ketiga. 11111000 bernilai 248, jadi mask-nya 255.255.248.0."],
        ["Berapa ukuran blok subnet /29 pada oktet terakhir?", "4", "8", "16", "32", "Mask /29 adalah 255.255.255.248. Kurangi 248 dari 256 untuk mendapatkan blok 8 alamat."],
        ["Apa subnet standar terkecil yang mendukung 500 alamat host yang dapat digunakan?", "/24", "/23", "/22", "/25", "/24 hanya memiliki 254 host yang dapat digunakan. /23 menyisakan 9 bit host dan menyediakan 510 alamat."],
        ["Prefix CIDR apa yang cocok dengan 255.255.255.248?", "/27", "/28", "/29", "/30", "Tiga oktet pertama menyumbang 24 bit bernilai satu. 248 adalah 11111000 dalam biner, menambah lima bit sehingga menjadi /29."],
      ] },
      ranges: { title: "Cari subnet", description: "Hitung rentang dari alamat IPv4", questions: [
        ["Jaringan mana yang mencakup 192.168.10.77/26?", "192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26", "/26 bertambah 64 pada oktet terakhir. Blok dimulai pada 0, 64, 128, dan 192; alamat 77 berada di blok yang dimulai pada 64."],
        ["Apa alamat broadcast untuk 192.168.10.77/26?", "192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255", "Blok 192.168.10.64/26 berakhir tepat sebelum blok berikutnya di .128, jadi alamat broadcast-nya .127."],
        ["Apa host pertama yang dapat digunakan di 192.168.10.77/26?", "192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126", "Alamat jaringan adalah 192.168.10.64. Host pertama yang dapat digunakan satu alamat setelahnya, yaitu .65."],
        ["Apa host terakhir yang dapat digunakan di 192.168.10.77/26?", "192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254", "Alamat broadcast adalah 192.168.10.127. Host terakhir yang dapat digunakan satu alamat sebelumnya, yaitu .126."],
        ["Berapa alamat host yang dapat digunakan di 192.168.10.77/26?", "30", "62", "64", "126", "/26 menyisakan 6 bit host atau 64 alamat. Setelah alamat jaringan dan broadcast dicadangkan, tersisa 62 host."],
      ] },
      design: { title: "Desain subnet", description: "Perencanaan kapasitas, VLSM, dan prefix khusus", questions: [
        ["Apa subnet standar terkecil yang mendukung 60 perangkat host?", "/27", "/26", "/25", "/24", "/27 menyediakan 30 host yang dapat digunakan. /26 menyediakan 62, sehingga menjadi prefix terkecil yang cukup untuk 60 perangkat."],
        ["Saat merencanakan VLSM, kebutuhan mana yang dialokasikan terlebih dahulu?", "Subnet dengan host paling sedikit", "Subnet dengan host paling banyak", "Subnet dengan nama terpendek", "Subnet dengan alamat gateway terendah", "Alokasikan kebutuhan host terbesar lebih dulu. Ini menyediakan blok berurutan yang cukup besar dan mengurangi risiko ruang alamat terpecah oleh alokasi kecil."],
        ["Mask mana yang cocok dengan prefix /23?", "255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0", "/23 memiliki 16 bit jaringan dan tujuh bit pada oktet ketiga. 11111110 bernilai 254, sehingga mask-nya 255.255.254.0."],
        ["Apa alamat jaringan untuk 172.16.5.12/30?", "172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15", "/30 memiliki blok empat alamat. Blok di oktet terakhir dimulai pada 0, 4, 8, 12, dan seterusnya; .12 adalah alamat jaringan."],
        ["Bagaimana prefix /31 biasanya digunakan pada tautan point-to-point?", "Memiliki 30 host yang dapat digunakan", "Kedua alamat dapat menjadi endpoint tanpa alamat broadcast", "Memiliki satu host dan satu alamat broadcast", "Dikhususkan untuk multicast", "Pada tautan point-to-point, kedua alamat dalam /31 dapat digunakan sebagai endpoint. Pengecualian jaringan dan broadcast tradisional tidak berlaku."],
      ] },
    },
  },
  pt: {
    pageTitle: "Questionário de sub-redes IPv4", pageIntro: "Escolha um conjunto, responda no seu ritmo e confira a explicação de cada questão.", needRefresher: "Precisa revisar?", readGuide: "Leia o guia de sub-redes",
    quizLabel: "Questionário de sub-redes", questionLabel: "Questão", questionOf: "de", progressLabel: "Progresso do questionário", questionsLabel: "questões", correctAnswer: "Resposta correta", yourAnswer: "Sua resposta", right: "Você acertou.", notQuite: "Quase.", allSets: "Todos os conjuntos", checkAnswer: "Conferir resposta", nextQuestion: "Próxima questão", seeResults: "Ver resultado", setComplete: "Conjunto concluído", resultSummary: "Você acertou {score} de {total} questões em {set}.", reviewAnswers: "Revise estas respostas", answer: "Resposta:", retry: "Tentar este conjunto novamente", chooseAnother: "Escolher outro conjunto",
    sets: {
      basics: { title: "Fundamentos de sub-redes", description: "Prefixos, máscaras e funções dos endereços", questions: [
        ["O que /24 indica em 192.168.1.0/24?", "24 bits identificam a rede", "A sub-rede comporta 24 hosts", "Há 24 sub-redes disponíveis", "O endereço tem 24 octetos", "O comprimento do prefixo conta os bits de rede. O IPv4 tem 32 bits, então /24 deixa 8 bits para os endereços dentro da sub-rede."],
        ["Qual máscara de sub-rede corresponde ao prefixo /26?", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "/26 tem 24 bits de rede completos e mais dois no último octeto. O valor binário 11000000 equivale a 192."],
        ["Qual endereço é o endereço de rede em uma sub-rede IPv4 padrão?", "O endereço com todos os bits de host em 1", "O endereço com todos os bits de host em 0", "O primeiro endereço depois do gateway", "Qualquer endereço terminado em .0", "O endereço de rede marca o início da sub-rede. A parte de host contém apenas zeros; ele nem sempre termina em .0."],
        ["Pelas regras IPv4 usuais, quantos endereços de host utilizáveis há em uma sub-rede /30?", "1", "2", "4", "6", "/30 deixa dois bits de host, totalizando quatro endereços. Excluindo rede e broadcast, restam dois hosts utilizáveis."],
        ["O que um roteador compara para decidir se um destino está na sub-rede local?", "As portas de origem e destino", "A parte de rede dos endereços usando a máscara", "Somente o último octeto", "Os nomes DNS dos dois dispositivos", "A máscara identifica os bits de rede. O roteador compara as partes de rede local e de destino para decidir entre entrega local e roteamento."],
      ] },
      capacity: { title: "Máscaras e capacidade", description: "Converta prefixos e calcule o tamanho da sub-rede", questions: [
        ["Pelas regras IPv4 usuais, quantos hosts utilizáveis uma /27 oferece?", "14", "30", "32", "62", "/27 deixa 5 bits de host: 2⁵ resulta em 32 endereços. Excluindo rede e broadcast, restam 30 hosts utilizáveis."],
        ["Qual é a máscara decimal pontuada para /21?", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0", "/21 abrange dois octetos completos (16 bits) e cinco bits do terceiro. 11111000 vale 248, então a máscara é 255.255.248.0."],
        ["Qual é o tamanho do bloco de uma sub-rede /29 no último octeto?", "4", "8", "16", "32", "A máscara /29 é 255.255.255.248. Subtraia 248 de 256 para obter blocos de 8 endereços."],
        ["Qual é a menor sub-rede padrão que comporta 500 endereços de host utilizáveis?", "/24", "/23", "/22", "/25", "/24 tem apenas 254 hosts utilizáveis. /23 deixa 9 bits de host e oferece 510 endereços utilizáveis."],
        ["Qual prefixo CIDR corresponde a 255.255.255.248?", "/27", "/28", "/29", "/30", "Os três primeiros octetos somam 24 bits em 1. 248 é 11111000 em binário, acrescentando cinco bits: /29."],
      ] },
      ranges: { title: "Encontre a sub-rede", description: "Calcule intervalos a partir de um endereço IPv4", questions: [
        ["Qual rede contém 192.168.10.77/26?", "192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26", "/26 avança em blocos de 64 no último octeto. Os blocos começam em 0, 64, 128 e 192; o endereço 77 está no bloco iniciado em 64."],
        ["Qual é o endereço de broadcast de 192.168.10.77/26?", "192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255", "O bloco 192.168.10.64/26 termina logo antes do próximo, em .128. Portanto, o broadcast é .127."],
        ["Qual é o primeiro host utilizável em 192.168.10.77/26?", "192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126", "O endereço de rede é 192.168.10.64. O primeiro host utilizável é o seguinte: .65."],
        ["Qual é o último host utilizável em 192.168.10.77/26?", "192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254", "O broadcast é 192.168.10.127. O último host utilizável é o endereço anterior: .126."],
        ["Quantos endereços de host utilizáveis há em 192.168.10.77/26?", "30", "62", "64", "126", "/26 deixa 6 bits de host, ou 64 endereços. Reservando os endereços de rede e broadcast, restam 62 hosts utilizáveis."],
      ] },
      design: { title: "Projeto de sub-redes", description: "Planejamento de capacidade, VLSM e prefixos especiais", questions: [
        ["Qual é a menor sub-rede padrão que comporta 60 dispositivos?", "/27", "/26", "/25", "/24", "/27 oferece 30 hosts utilizáveis. /26 oferece 62, sendo o menor prefixo que atende a 60 dispositivos."],
        ["No planejamento com VLSM, qual requisito deve ser alocado primeiro?", "A sub-rede com menos hosts", "A sub-rede com mais hosts", "A sub-rede com o nome mais curto", "A sub-rede com o gateway de menor endereço", "Alocar primeiro a maior necessidade de hosts garante um bloco contíguo grande o suficiente e reduz o risco de fragmentação do espaço de endereços."],
        ["Qual máscara corresponde ao prefixo /23?", "255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0", "/23 tem 16 bits de rede e sete no terceiro octeto. 11111110 vale 254, então a máscara é 255.255.254.0."],
        ["Qual é o endereço de rede de 172.16.5.12/30?", "172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15", "Uma /30 tem blocos de quatro endereços. No último octeto, os blocos começam em 0, 4, 8, 12 e assim por diante; .12 é o endereço de rede."],
        ["Como um prefixo /31 costuma funcionar em um enlace ponto a ponto?", "Tem 30 hosts utilizáveis", "Os dois endereços podem ser extremos, sem endereço de broadcast", "Tem um host e um broadcast", "É reservado para multicast", "Em enlaces ponto a ponto, os dois endereços de uma /31 podem ser usados como extremos. As exclusões tradicionais de rede e broadcast não se aplicam."],
      ] },
    },
  },
  fr: {
    pageTitle: "Quiz sur les sous-réseaux IPv4", pageIntro: "Choisissez une série, répondez à votre rythme et consultez l’explication de chaque question.", needRefresher: "Besoin de réviser ?", readGuide: "Lire le guide des sous-réseaux",
    quizLabel: "Quiz sur les sous-réseaux", questionLabel: "Question", questionOf: "sur", progressLabel: "Progression du quiz", questionsLabel: "questions", correctAnswer: "Bonne réponse", yourAnswer: "Votre réponse", right: "Bonne réponse.", notQuite: "Pas tout à fait.", allSets: "Toutes les séries", checkAnswer: "Vérifier la réponse", nextQuestion: "Question suivante", seeResults: "Voir les résultats", setComplete: "Série terminée", resultSummary: "Vous avez obtenu {score} bonnes réponses sur {total} dans la série {set}.", reviewAnswers: "Revoir ces réponses", answer: "Réponse :", retry: "Recommencer cette série", chooseAnother: "Choisir une autre série",
    sets: {
      basics: { title: "Bases des sous-réseaux", description: "Préfixes, masques et rôle des adresses", questions: [
        ["Que signifie /24 dans 192.168.1.0/24 ?", "24 bits identifient le réseau", "Le sous-réseau accepte 24 hôtes", "24 sous-réseaux sont disponibles", "L’adresse comporte 24 octets", "La longueur du préfixe compte les bits réseau. IPv4 en compte 32 ; /24 laisse donc 8 bits aux adresses du sous-réseau."],
        ["Quel masque de sous-réseau correspond au préfixe /26 ?", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "/26 compte 24 bits réseau complets et deux bits supplémentaires dans le dernier octet. 11000000 en binaire vaut 192."],
        ["Quelle adresse est l’adresse réseau dans un sous-réseau IPv4 standard ?", "Celle dont tous les bits hôte valent 1", "Celle dont tous les bits hôte valent 0", "La première adresse après la passerelle", "Toute adresse se terminant par .0", "L’adresse réseau marque le début du sous-réseau. Sa partie hôte ne contient que des zéros ; elle ne se termine pas toujours par .0."],
        ["Selon les règles IPv4 habituelles, combien d’adresses hôte utilisables compte un sous-réseau /30 ?", "1", "2", "4", "6", "/30 laisse deux bits hôte, soit quatre adresses. Après exclusion de l’adresse réseau et de diffusion, deux hôtes sont utilisables."],
        ["Que compare un routeur pour savoir si une destination est sur le sous-réseau local ?", "Les ports source et destination", "La partie réseau des adresses avec le masque", "Le dernier octet uniquement", "Les noms DNS des deux appareils", "Le masque indique les bits réseau. Le routeur compare les parties réseau locale et distante pour choisir une remise locale ou un routage."],
      ] },
      capacity: { title: "Masques et capacité", description: "Convertir les préfixes et dimensionner un sous-réseau", questions: [
        ["Selon les règles IPv4 habituelles, combien d’hôtes utilisables fournit /27 ?", "14", "30", "32", "62", "/27 laisse 5 bits hôte : 2⁵ donne 32 adresses. En retirant réseau et diffusion, il reste 30 hôtes utilisables."],
        ["Quel masque décimal pointé correspond à /21 ?", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.255.0", "/21 couvre deux octets complets (16 bits) et cinq bits du troisième. 11111000 vaut 248 : le masque est 255.255.248.0."],
        ["Quelle est la taille de bloc d’un sous-réseau /29 dans le dernier octet ?", "4", "8", "16", "32", "Le masque /29 est 255.255.255.248. Soustrayez 248 de 256 pour obtenir des blocs de 8 adresses."],
        ["Quel est le plus petit sous-réseau standard prenant en charge 500 hôtes utilisables ?", "/24", "/23", "/22", "/25", "/24 ne fournit que 254 hôtes utilisables. /23 laisse 9 bits hôte et en fournit 510."],
        ["Quel préfixe CIDR correspond à 255.255.255.248 ?", "/27", "/28", "/29", "/30", "Les trois premiers octets apportent 24 bits à 1. 248 s’écrit 11111000 en binaire, soit cinq bits de plus : /29."],
      ] },
      ranges: { title: "Trouver le sous-réseau", description: "Calculer les plages à partir d’une adresse IPv4", questions: [
        ["Quel réseau contient 192.168.10.77/26 ?", "192.168.10.0/26", "192.168.10.64/26", "192.168.10.77/26", "192.168.10.128/26", "/26 progresse par blocs de 64 dans le dernier octet. Les blocs commencent à 0, 64, 128 et 192 ; 77 se trouve dans celui qui commence à 64."],
        ["Quelle est l’adresse de diffusion de 192.168.10.77/26 ?", "192.168.10.63", "192.168.10.126", "192.168.10.127", "192.168.10.255", "Le bloc 192.168.10.64/26 se termine juste avant le bloc suivant, qui commence à .128. L’adresse de diffusion est donc .127."],
        ["Quelle est la première adresse hôte utilisable dans 192.168.10.77/26 ?", "192.168.10.64", "192.168.10.65", "192.168.10.77", "192.168.10.126", "L’adresse réseau est 192.168.10.64. Le premier hôte utilisable est l’adresse suivante : .65."],
        ["Quelle est la dernière adresse hôte utilisable dans 192.168.10.77/26 ?", "192.168.10.126", "192.168.10.127", "192.168.10.128", "192.168.10.254", "L’adresse de diffusion est 192.168.10.127. Le dernier hôte utilisable est l’adresse précédente : .126."],
        ["Combien d’adresses hôte utilisables compte 192.168.10.77/26 ?", "30", "62", "64", "126", "/26 laisse 6 bits hôte, soit 64 adresses. Après réservation des adresses réseau et de diffusion, il reste 62 hôtes utilisables."],
      ] },
      design: { title: "Conception de sous-réseaux", description: "Dimensionnement, VLSM et préfixes spéciaux", questions: [
        ["Quel est le plus petit sous-réseau standard prenant en charge 60 appareils ?", "/27", "/26", "/25", "/24", "/27 fournit 30 hôtes utilisables. /26 en fournit 62 : c’est le plus petit préfixe adapté à 60 appareils."],
        ["Lors d’une planification VLSM, quel besoin faut-il allouer en premier ?", "Le sous-réseau qui nécessite le moins d’hôtes", "Le sous-réseau qui nécessite le plus d’hôtes", "Le sous-réseau au nom le plus court", "Le sous-réseau avec la passerelle la plus basse", "Allouez d’abord le besoin le plus important. Il obtient ainsi un bloc contigu assez grand et l’espace d’adresses risque moins d’être fragmenté."],
        ["Quel masque correspond au préfixe /23 ?", "255.255.254.0", "255.255.252.0", "255.255.255.128", "255.255.255.0", "/23 compte 16 bits réseau et sept dans le troisième octet. 11111110 vaut 254 ; le masque est 255.255.254.0."],
        ["Quelle est l’adresse réseau de 172.16.5.12/30 ?", "172.16.5.8", "172.16.5.12", "172.16.5.13", "172.16.5.15", "Un /30 comprend des blocs de quatre adresses. Dans le dernier octet, ils commencent à 0, 4, 8, 12, etc. ; .12 est l’adresse réseau."],
        ["Comment un préfixe /31 fonctionne-t-il généralement sur une liaison point à point ?", "Il offre 30 hôtes utilisables", "Les deux adresses peuvent servir d’extrémités, sans adresse de diffusion", "Il contient un hôte et une adresse de diffusion", "Il est réservé à la multidiffusion", "Sur une liaison point à point, les deux adresses d’un /31 peuvent servir d’extrémités. Les exclusions réseau et diffusion habituelles ne s’appliquent pas."],
      ] },
    },
  },
};

export function getQuizTranslation(locale: Locale): QuizTranslation | null {
  if (locale === "en") return null;
  const source = quizTranslations[locale];
  const setIds = ["basics", "capacity", "ranges", "design"];
  const questionIds = [["b1", "b2", "b3", "b4", "b5"], ["c1", "c2", "c3", "c4", "c5"], ["r1", "r2", "r3", "r4", "r5"], ["d1", "d2", "d3", "d4", "d5"]];
  const sets = Object.fromEntries(setIds.map((id, setIndex) => {
    const sourceSet = source.sets[id];
    const questions = Object.fromEntries(sourceSet.questions.map((row, index) => [questionIds[setIndex][index], {
      prompt: row[0], options: row.slice(1, 5), explanation: row[5],
    }]));
    return [id, { title: sourceSet.title, description: sourceSet.description, questions }];
  }));
  const labels = Object.fromEntries(Object.entries(source).filter(([key]) => key !== "sets")) as Omit<TranslationRows, "sets">;
  return { ...labels, sets };
}
