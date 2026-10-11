import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n-shared";

const content: Record<Locale, {
  title: string;
  intro: string;
  example: string;
  mask: string;
  network: string;
  broadcast: string;
  range: string;
  usable: string;
  countTitle: string;
  count: string;
  countExample: string;
  resultsTitle: string;
  results: string;
  vlsmLink: string;
  guideLink: string;
}> = {
  en: {
    title: "How to calculate an IPv4 subnet", intro: "Enter an IPv4 address with a CIDR prefix, such as 192.168.1.130/26, or provide a subnet mask. The prefix tells you how many of the address’s 32 bits identify the network. The calculator applies that mask to find the network range, host addresses, and broadcast address.", example: "Example: 192.168.1.130/26", mask: "A /26 mask is 255.255.255.192. It leaves 6 host bits, so the block contains 64 addresses. The last octet advances in blocks of 64; address .130 falls in the .128–.191 block.", network: "Network address", broadcast: "Broadcast address", range: "Usable host range", usable: "Usable hosts", countTitle: "Subnet size and usable host count", count: "For an IPv4 prefix /n, there are 32 − n host bits and 2^(32 − n) total addresses. Most subnets reserve the first address as the network identifier and the last as the broadcast address, leaving two fewer usable host addresses. A /31 point-to-point link can use both addresses, while a /32 identifies one address and has no separate broadcast address.", countExample: "For example, a /24 contains 256 total addresses and normally supports 254 hosts. A /25 splits that address space into two blocks of 128 addresses, each with 126 usable hosts.", resultsTitle: "What this subnet calculator returns", results: "The results include the network and broadcast addresses, first and last host addresses, usable and total address counts, subnet and wildcard masks, CIDR prefix, and binary address and mask. The calculation runs in your browser using the address and prefix you enter. For allocating several differently sized networks from one block, use the", vlsmLink: "VLSM calculator", guideLink: "IPv4 subnetting guide",
  },
  zh: {
    title: "如何计算 IPv4 子网", intro: "输入带 CIDR 前缀的 IPv4 地址，例如 192.168.1.130/26，也可以输入子网掩码。前缀表示地址的 32 位中有多少位用于标识网络。计算器会应用该掩码，得出网络范围、主机地址和广播地址。", example: "示例：192.168.1.130/26", mask: "/26 掩码为 255.255.255.192，剩下 6 个主机位，因此地址块共有 64 个地址。最后一个八位组按 64 递增；地址 .130 属于 .128–.191 地址块。", network: "网络地址", broadcast: "广播地址", range: "可用主机范围", usable: "可用主机数", countTitle: "子网大小与可用主机数", count: "对于 IPv4 前缀 /n，主机位数为 32 − n，总地址数为 2^(32 − n)。通常子网的第一个地址用于标识网络，最后一个地址用于广播，因此可用主机地址少两个。点对点 /31 链路可以使用两个地址；/32 表示单个地址，没有单独的广播地址。", countExample: "例如，/24 共包含 256 个地址，通常可容纳 254 台主机。/25 会将其划分成两个各含 128 个地址的块，每块有 126 个可用主机地址。", resultsTitle: "子网计算器会显示哪些结果", results: "结果包括网络地址和广播地址、首末主机地址、可用及总地址数、子网掩码和通配掩码、CIDR 前缀，以及地址与掩码的二进制形式。计算在浏览器中根据输入的地址和前缀完成。如需从一个地址块中分配多个不同大小的网络，请使用", vlsmLink: "VLSM 计算器", guideLink: "IPv4 子网指南",
  },
  es: {
    title: "Cómo calcular una subred IPv4", intro: "Introduce una dirección IPv4 con un prefijo CIDR, como 192.168.1.130/26, o indica una máscara de subred. El prefijo señala cuántos de los 32 bits identifican la red. La calculadora aplica esa máscara para obtener el rango de red, las direcciones de host y la dirección de difusión.", example: "Ejemplo: 192.168.1.130/26", mask: "La máscara /26 es 255.255.255.192. Deja 6 bits de host, por lo que el bloque contiene 64 direcciones. El último octeto avanza en bloques de 64; la dirección .130 pertenece al bloque .128–.191.", network: "Dirección de red", broadcast: "Dirección de difusión", range: "Rango de hosts utilizables", usable: "Hosts utilizables", countTitle: "Tamaño de subred y cantidad de hosts utilizables", count: "Para un prefijo IPv4 /n hay 32 − n bits de host y 2^(32 − n) direcciones totales. En la mayoría de las subredes, la primera dirección identifica la red y la última se reserva para difusión, por lo que quedan dos direcciones utilizables menos. Un enlace punto a punto /31 puede usar ambas direcciones; /32 identifica una sola dirección y no tiene una dirección de difusión independiente.", countExample: "Por ejemplo, una /24 contiene 256 direcciones y normalmente admite 254 hosts. Una /25 divide ese espacio en dos bloques de 128 direcciones, cada uno con 126 hosts utilizables.", resultsTitle: "Resultados de esta calculadora de subredes", results: "Los resultados incluyen las direcciones de red y difusión, el primer y último host, el total de direcciones y las utilizables, las máscaras de subred y wildcard, el prefijo CIDR y las representaciones binarias de la dirección y la máscara. El cálculo se realiza en el navegador con la dirección y el prefijo indicados. Para asignar varias redes de distintos tamaños desde un mismo bloque, usa la", vlsmLink: "calculadora VLSM", guideLink: "guía de subredes IPv4",
  },
  ar: {
    title: "كيفية حساب شبكة IPv4 فرعية", intro: "أدخل عنوان IPv4 مع بادئة CIDR، مثل 192.168.1.130/26، أو أدخل قناع الشبكة الفرعية. تحدد البادئة عدد البتات من أصل 32 التي تعرّف الشبكة. يطبّق الحاسوب القناع لإيجاد نطاق الشبكة وعناوين المضيف وعنوان البث.", example: "مثال: 192.168.1.130/26", mask: "قناع /26 هو 255.255.255.192. يترك 6 بتات للمضيف، لذا تحتوي الكتلة على 64 عنوانًا. يزداد الثماني الأخير بمقدار 64؛ والعنوان .130 يقع ضمن الكتلة .128–.191.", network: "عنوان الشبكة", broadcast: "عنوان البث", range: "نطاق عناوين المضيف المتاحة", usable: "المضيفون المتاحون", countTitle: "حجم الشبكة وعدد المضيفين المتاحين", count: "لبادئة IPv4 /n يوجد 32 − n بتًا للمضيف، ويكون إجمالي العناوين 2^(32 − n). تحجز معظم الشبكات العنوان الأول لتعريف الشبكة والأخير للبث، لذلك يقل عدد عناوين المضيف المتاحة بمقدار اثنين. يمكن لوصلة /31 من نقطة إلى نقطة استخدام العنوانين؛ أما /32 فيحدد عنوانًا واحدًا ولا يملك عنوان بث منفصلًا.", countExample: "مثلًا، تحتوي /24 على 256 عنوانًا وتدعم عادةً 254 مضيفًا. وتقسم /25 هذه المساحة إلى كتلتين من 128 عنوانًا، مع 126 عنوان مضيف متاح في كل كتلة.", resultsTitle: "ما الذي يعرضه حاسوب الشبكات الفرعية؟", results: "تشمل النتائج عنوان الشبكة والبث، وأول وآخر عنوان للمضيف، وعدد العناوين الكلي والمتاح، وقناع الشبكة والقناع العكسي، وبادئة CIDR، والتمثيل الثنائي للعنوان والقناع. يجري الحساب في المتصفح اعتمادًا على العنوان والبادئة المدخلين. لتخصيص عدة شبكات بأحجام مختلفة من كتلة واحدة، استخدم", vlsmLink: "حاسبة VLSM", guideLink: "دليل شبكات IPv4 الفرعية",
  },
  id: {
    title: "Cara menghitung subnet IPv4", intro: "Masukkan alamat IPv4 dengan prefix CIDR, seperti 192.168.1.130/26, atau masukkan subnet mask. Prefix menunjukkan jumlah dari 32 bit alamat yang mengidentifikasi jaringan. Kalkulator menerapkan mask tersebut untuk menentukan rentang jaringan, alamat host, dan alamat broadcast.", example: "Contoh: 192.168.1.130/26", mask: "Mask /26 adalah 255.255.255.192. Tersisa 6 bit host, sehingga blok ini berisi 64 alamat. Oktet terakhir bertambah dalam blok 64; alamat .130 berada di blok .128–.191.", network: "Alamat jaringan", broadcast: "Alamat broadcast", range: "Rentang host yang dapat digunakan", usable: "Host yang dapat digunakan", countTitle: "Ukuran subnet dan jumlah host yang dapat digunakan", count: "Untuk prefix IPv4 /n, terdapat 32 − n bit host dan 2^(32 − n) alamat total. Biasanya alamat pertama dicadangkan untuk identitas jaringan dan alamat terakhir untuk broadcast, sehingga alamat host yang dapat digunakan berkurang dua. Tautan point-to-point /31 dapat memakai kedua alamat; /32 menunjukkan satu alamat tanpa alamat broadcast terpisah.", countExample: "Contohnya, /24 berisi 256 alamat dan biasanya mendukung 254 host. /25 membagi rentang itu menjadi dua blok berisi 128 alamat, masing-masing dengan 126 host yang dapat digunakan.", resultsTitle: "Hasil dari kalkulator subnet ini", results: "Hasil mencakup alamat jaringan dan broadcast, alamat host pertama dan terakhir, jumlah alamat total dan yang dapat digunakan, subnet mask dan wildcard mask, prefix CIDR, serta representasi biner alamat dan mask. Perhitungan dilakukan di browser berdasarkan alamat dan prefix yang Anda masukkan. Untuk membagi satu blok menjadi beberapa jaringan dengan ukuran berbeda, gunakan", vlsmLink: "kalkulator VLSM", guideLink: "panduan subnet IPv4",
  },
  pt: {
    title: "Como calcular uma sub-rede IPv4", intro: "Digite um endereço IPv4 com prefixo CIDR, como 192.168.1.130/26, ou informe uma máscara de sub-rede. O prefixo indica quantos dos 32 bits identificam a rede. A calculadora aplica a máscara para encontrar o intervalo da rede, os endereços de host e o endereço de broadcast.", example: "Exemplo: 192.168.1.130/26", mask: "A máscara /26 é 255.255.255.192. Ela deixa 6 bits de host, então o bloco contém 64 endereços. O último octeto avança em blocos de 64; o endereço .130 está no bloco .128–.191.", network: "Endereço de rede", broadcast: "Endereço de broadcast", range: "Intervalo de hosts utilizáveis", usable: "Hosts utilizáveis", countTitle: "Tamanho da sub-rede e quantidade de hosts utilizáveis", count: "Para um prefixo IPv4 /n, há 32 − n bits de host e 2^(32 − n) endereços no total. Normalmente, o primeiro endereço identifica a rede e o último é reservado ao broadcast, deixando dois endereços utilizáveis a menos. Um enlace ponto a ponto /31 pode usar os dois endereços; /32 identifica um único endereço e não tem broadcast separado.", countExample: "Por exemplo, uma /24 contém 256 endereços e normalmente comporta 254 hosts. Uma /25 divide esse espaço em dois blocos de 128 endereços, cada um com 126 hosts utilizáveis.", resultsTitle: "O que a calculadora de sub-rede mostra", results: "Os resultados incluem os endereços de rede e broadcast, o primeiro e o último host, o total de endereços e os utilizáveis, as máscaras de sub-rede e wildcard, o prefixo CIDR e as representações binárias do endereço e da máscara. O cálculo ocorre no navegador com o endereço e o prefixo informados. Para alocar várias redes de tamanhos diferentes em um mesmo bloco, use a", vlsmLink: "calculadora VLSM", guideLink: "guia de sub-redes IPv4",
  },
  fr: {
    title: "Comment calculer un sous-réseau IPv4", intro: "Saisissez une adresse IPv4 avec un préfixe CIDR, par exemple 192.168.1.130/26, ou indiquez un masque de sous-réseau. Le préfixe précise combien des 32 bits identifient le réseau. Le calculateur applique ce masque pour trouver la plage réseau, les adresses d’hôte et l’adresse de diffusion.", example: "Exemple : 192.168.1.130/26", mask: "Le masque /26 est 255.255.255.192. Il laisse 6 bits d’hôte, soit 64 adresses dans le bloc. Le dernier octet progresse par blocs de 64 ; l’adresse .130 appartient au bloc .128–.191.", network: "Adresse réseau", broadcast: "Adresse de diffusion", range: "Plage d’hôtes utilisables", usable: "Hôtes utilisables", countTitle: "Taille du sous-réseau et nombre d’hôtes utilisables", count: "Pour un préfixe IPv4 /n, il y a 32 − n bits d’hôte et 2^(32 − n) adresses au total. En général, la première adresse identifie le réseau et la dernière est réservée à la diffusion, ce qui retire deux adresses utilisables. Une liaison point à point /31 peut utiliser les deux adresses ; /32 désigne une seule adresse sans adresse de diffusion distincte.", countExample: "Par exemple, un /24 contient 256 adresses et prend généralement en charge 254 hôtes. Un /25 divise cette plage en deux blocs de 128 adresses, chacun avec 126 hôtes utilisables.", resultsTitle: "Résultats du calculateur de sous-réseau", results: "Les résultats comprennent les adresses réseau et de diffusion, le premier et le dernier hôte, les nombres total et utilisable d’adresses, les masques de sous-réseau et générique, le préfixe CIDR et les représentations binaires de l’adresse et du masque. Le calcul est effectué dans votre navigateur à partir de l’adresse et du préfixe saisis. Pour répartir plusieurs réseaux de tailles différentes dans un même bloc, utilisez le", vlsmLink: "calculateur VLSM", guideLink: "guide des sous-réseaux IPv4",
  },
};

export function SubnetSeoContent({ locale = "en" }: { locale?: Locale }) {
  const copy = content[locale];
  return (
    <article className="mx-auto mt-16 w-full max-w-4xl space-y-10 border-t border-border pt-10">
      <section aria-labelledby="subnet-calculation-heading">
        <h2 id="subnet-calculation-heading" className="text-2xl font-semibold tracking-tight">{copy.title}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
        <div className="mt-5 rounded-lg border border-border bg-card p-5">
          <h3 className="font-medium">{copy.example}</h3>
          <p className="mt-2 leading-7 text-muted-foreground">{copy.mask}</p>
          <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            <div><dt className="text-muted-foreground">{copy.network}</dt><dd className="font-medium" dir="ltr">192.168.1.128</dd></div>
            <div><dt className="text-muted-foreground">{copy.broadcast}</dt><dd className="font-medium" dir="ltr">192.168.1.191</dd></div>
            <div><dt className="text-muted-foreground">{copy.range}</dt><dd className="font-medium" dir="ltr">192.168.1.129–192.168.1.190</dd></div>
            <div><dt className="text-muted-foreground">{copy.usable}</dt><dd className="font-medium">62</dd></div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="host-count-heading">
        <h2 id="host-count-heading" className="text-2xl font-semibold tracking-tight">{copy.countTitle}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.count}</p>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.countExample}</p>
      </section>

      <section aria-labelledby="subnet-tool-heading">
        <h2 id="subnet-tool-heading" className="text-2xl font-semibold tracking-tight">{copy.resultsTitle}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          {copy.results}{" "}
          <Link className="text-primary underline underline-offset-4" href={localizedPath(locale, "/vlsm")}>{copy.vlsmLink}</Link>; {locale === "ar" ? "ولشرح البادئات وعدد المضيفين، راجع" : locale === "fr" ? "; pour comprendre les préfixes et le nombre d’hôtes, consultez le" : locale === "zh" ? "；有关前缀和主机数的基础知识，请参阅" : locale === "id" ? "; untuk memahami prefix dan jumlah host, baca" : locale === "pt" ? "; para aprender sobre prefixos e quantidade de hosts, consulte o" : locale === "es" ? "; para aprender sobre prefijos y cantidad de hosts, consulta la" : "; for prefix and host-count basics, see the"}{" "}
          <Link className="text-primary underline underline-offset-4" href={localizedPath(locale, "/guide")}>{copy.guideLink}</Link>.
        </p>
      </section>
    </article>
  );
}
