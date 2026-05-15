import { Category, ContentItem } from '../types';

export const categories: Category[] = [
  {
    id: 'menstruacao',
    name: 'Menstruação',
    description: 'Ciclo, cólicas e saúde menstrual.',
    icon: 'Droplets',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'prevencao',
    name: 'Prevenção',
    description: 'Exames, vacinas e rastreio.',
    icon: 'ClipboardCheck',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'bem-estar',
    name: 'Bem-estar',
    description: 'Saúde mental e hábitos saudáveis.',
    icon: 'Sparkles',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'gravidez',
    name: 'Engravidar',
    description: 'Fertilidade e planejamento.',
    icon: 'Baby',
    color: 'bg-yellow-100 text-yellow-600',
  },
];

export const contentItems: ContentItem[] = [
  // ── MENSTRUAÇÃO ──────────────────────────────────────────────────────────────

  {
    id: 'corrimento',
    categoryId: 'menstruacao',
    title: 'Corrimento Vaginal: O que é normal?',
    summary: 'Entenda as variações do muco ao longo do ciclo e saiba quando buscar ajuda.',
    text: 'Durante o ciclo da mulher, o muco pode apresentar características diferentes, mas ainda assim ser considerado normal.\n\nO muco fisiológico normalmente é transparente ou claro, sem odor e não causa coceira. Durante o período fértil, é normal o muco se tornar mais elástico e lubrificante, semelhante a clara de ovo (transparente, escorregadio e fluido).\n\nVocê deve procurar a UBS sempre que houver:\n• Corrimento com odor forte ou desagradável\n• Coloração branca grumosa com coceira intensa\n• Coloração amarelada, esverdeada ou acinzentada\n• Corrimento acompanhado de dor pélvica ou ardência ao urinar\n\nIMPORTANTE: Gestante com qualquer tipo de alteração precisa de avaliação mesmo que leve.\n\nEssas informações não substituem avaliação médica. Procure sempre a UBS para confirmação e tratamento adequado.',
    tips: [
      'Mantenha a higiene íntima com água e sabão neutro, sem duchas internas.',
      'Evite roupas muito apertadas e calcinhas com tecidos sintéticos.',
      'Prefira dormir sem calcinha para ventilação da região.',
      'Evite uso de protetores diários contínuos.',
    ],
    references: ['Ministério da Saúde – Protocolos de Atenção Básica', 'Ebook Saúde da Mulher – SMS Brusque/SC'],
  },
  {
    id: 'colica',
    categoryId: 'menstruacao',
    title: 'Cólica Menstrual: Como aliviar?',
    summary: 'Dicas para lidar com a dor menstrual em casa e quando procurar a UBS.',
    text: 'A cólica é uma dor na parte de baixo da barriga (abaixo do umbigo), comum em mulheres. É muito comum em jovens e adolescentes logo após a primeira menstruação.\n\nVocê deve procurar a UBS sempre que houver:\n• Febre\n• Dor muito forte ou intensa à palpação\n• Sangramento intenso\n• Suspeita ou confirmação de gravidez\n• Manchas arroxeadas na pele\n\nEssas informações não substituem avaliação médica. Procure sempre a UBS para avaliação e conduta adequada.',
    tips: [
      'Faça compressas de água morna na região inferior do abdômen.',
      'Pratique atividade física leve regularmente.',
      'Mantenha hidratação e alimentação saudável.',
    ],
    references: ['Ebook Saúde da Mulher – SMS Brusque/SC'],
  },
  {
    id: 'atraso',
    categoryId: 'menstruacao',
    title: 'Atraso Menstrual',
    summary: 'Saiba quando o atraso é motivo para procurar a UBS e o que fazer em casa.',
    text: 'Atrasos curtos podem acontecer por estresse, mudança de rotina, alimentação ou outros fatores. No entanto, atrasos maiores merecem atenção.\n\nVocê deve procurar a UBS quando:\n• O atraso for de 15 dias ou mais\n• O teste de gravidez der positivo\n\nEssas informações não substituem avaliação médica. Procure sempre a UBS para confirmação e acompanhamento.',
    tips: [
      'Faça um teste de gravidez se o atraso for maior que 15 dias.',
      'Anote seus ciclos para observar um padrão.',
      'Evite automedicação.',
    ],
    references: ['Protocolo de Pré-Natal 2022 – SMS Brusque/SC'],
  },
  {
    id: 'sangramento-fora',
    categoryId: 'menstruacao',
    title: 'Sangramento Fora do Período Menstrual',
    summary: 'O que observar e quando procurar avaliação médica.',
    text: 'Sangramentos que ocorrem fora do período menstrual merecem atenção e registro.\n\nO que observar em casa:\n• Volume e frequência do sangramento\n• Relação com medicamentos ou início de métodos contraceptivos\n• Presença de cólicas associadas\n• Há quanto tempo e quais dias você percebeu o sangramento\n\nVocê deve procurar a UBS sempre que houver qualquer sangramento fora do período menstrual para avaliação e exame físico.\n\nEssas informações não substituem avaliação médica.',
    tips: [
      'Anote no calendário os dias em que percebeu sangramento.',
      'Evite relações sexuais até avaliação se o sangramento for repetido.',
      'Relate ao médico se há uso de anticoncepcional recente.',
    ],
    references: ['Ministério da Saúde – Protocolos de Atenção Básica'],
  },
  {
    id: 'ciclo',
    categoryId: 'menstruacao',
    title: 'Conheça seu Ciclo Menstrual',
    summary: 'O ciclo menstrual varia entre 21 e 36 dias. Entenda o que é normal.',
    text: 'O ciclo menstrual costuma variar entre 21 e 36 dias, com sangramento de 3 a 7 dias. É normal pequenas variações de duração e intensidade, especialmente em adolescentes, pós-parto e perto da menopausa.\n\nO ciclo começa no primeiro dia da menstruação e vai até o dia antes da próxima. Só 10% a 15% das mulheres têm aquele ciclo "perfeito" de 28 dias — se o seu varia entre 25 e 30 dias, isso ainda pode ser totalmente normal.\n\nAcompanhar seus ciclos por alguns meses ajuda a entender seu próprio ritmo e identificar qualquer alteração.',
    tips: [
      'Anote o ciclo: dia, duração, intensidade e sintomas.',
      'Faça compressas mornas para aliviar cólicas.',
      'Mantenha hidratação e evite excesso de café e sal durante o período.',
      'Pratique relaxamento, como alongamento ou respiração profunda.',
    ],
    references: ['Política Nacional de Atenção à Mulher – Ministério da Saúde', 'Ebook Saúde da Mulher – SMS Brusque/SC'],
  },

  // ── PREVENÇÃO ────────────────────────────────────────────────────────────────

  {
    id: 'cancer-colo',
    categoryId: 'prevencao',
    title: 'Prevenção do Câncer de Colo do Útero',
    summary: 'O exame preventivo (Papanicolau) salva vidas. Saiba quando e por que fazê-lo.',
    text: 'Fazer o exame preventivo (Papanicolau) regularmente faz parte do cuidado com a saúde da mulher. Ele ajuda a identificar alterações antes que virem câncer.\n\nSe você tem entre 25 e 64 anos e já iniciou atividade sexual, deve realizar o exame na UBS — independentemente da orientação sexual.\n\nProcure a UBS se:\n• Nunca fez o exame preventivo\n• Está há mais de 1 ano sem realizá-lo\n• Apresenta sangramento fora do período menstrual ou após relação sexual\n• Tem corrimento persistente com cheiro forte\n• Sente dor pélvica frequente sem causa conhecida\n\nEssas informações não substituem avaliação médica. Ficou em dúvida? Procure sua UBS de referência.',
    tips: [
      'Mantenha os exames preventivos em dia conforme orientação da UBS.',
      'Use preservativo nas relações sexuais.',
      'Tome a vacina contra HPV quando indicada.',
      'Evite o tabagismo.',
    ],
    references: ['INCA – Diretrizes para Rastreamento do Câncer do Colo do Útero', 'Ebook Saúde da Mulher – SMS Brusque/SC'],
  },
  {
    id: 'cancer-mama',
    categoryId: 'prevencao',
    title: 'Prevenção do Câncer de Mama',
    summary: 'Autoexame, mamografia e sinais de alerta que todo mulher deve conhecer.',
    text: 'Realizar exames de rotina e observar as mamas faz parte do autocuidado e ajuda na detecção precoce.\n\nProcure a UBS se notar:\n• Caroço (nódulo) na mama ou na axila\n• Secreção pelo mamilo\n• Retração da pele ou do mamilo\n• Pele com aspecto de casca de laranja\n• Vermelhidão, inchaço ou mudança no formato da mama\n• Dor em uma ou ambas as mamas\n\nTambém procure se nunca realizou mamografia (a partir dos 40 anos ou antes, se indicado), ou se houver histórico familiar de câncer de mama.\n\nEssas informações não substituem avaliação médica.',
    tips: [
      'Observe suas mamas mensalmente, prestando atenção às mudanças.',
      'Agende mamografia conforme orientação da UBS.',
      'Evite tabagismo, excesso de álcool e sedentarismo.',
      'Mantenha alimentação saudável e pratique atividades físicas.',
    ],
    references: ['INCA – Diretrizes para Detecção Precoce do Câncer de Mama no Brasil'],
  },
  {
    id: 'dor-urinar',
    categoryId: 'prevencao',
    title: 'Dor ou Ardor ao Urinar',
    summary: 'Sintomas urinários que merecem atenção e quando procurar a UBS.',
    text: 'Dor ou ardor ao urinar pode indicar infecção urinária ou outros problemas que precisam de avaliação médica.\n\nFique atenta a:\n• Urgência em urinar\n• Ardor ao urinar, especialmente se repetido\n• Aumento da frequência urinária\n• Dor na região inferior do abdômen ou nas costas\n• Febre\n\nProcure a UBS se houver:\n• Ardor persistente ou vontade frequente de urinar\n• Presença de sangue na urina\n• Febre, dor lombar ou calafrios\n\nEssas informações não substituem avaliação médica. Procure sempre a UBS para confirmação e tratamento adequado.',
    tips: [
      'Beba bastante água ao longo do dia.',
      'Não segure a urina por longos períodos.',
      'Mantenha higiene íntima adequada.',
    ],
    references: ['Ebook Saúde da Mulher – SMS Brusque/SC', 'Ministério da Saúde – Protocolos de Atenção Básica'],
  },

  // ── BEM-ESTAR ────────────────────────────────────────────────────────────────

  {
    id: 'tpm',
    categoryId: 'bem-estar',
    title: 'TPM: Síndrome Pré-Menstrual',
    summary: 'Entenda as alterações emocionais antes da menstruação e como se cuidar.',
    text: 'Antes da menstruação, ocorre uma queda do hormônio estrogênio. Essa mudança pode influenciar substâncias do cérebro, como a serotonina e a dopamina, relacionadas ao bem-estar e às emoções.\n\nPor isso, algumas mulheres podem sentir irritação, tristeza, sensibilidade maior ou mudanças de humor nesse período. Mas nem todas vão sentir os mesmos sintomas — fatores como estresse, rotina, alimentação e sono também influenciam bastante.\n\nManter uma alimentação equilibrada, praticar atividade física, dormir bem e evitar excesso de álcool e cigarro ajudam a diminuir esses sintomas.',
    tips: [
      'Faça pequenas refeições equilibradas e pratique exercícios leves.',
      'Reduza o consumo de álcool e cafeína.',
      'Reserve momentos de descanso e lazer.',
      'Busque apoio psicológico se sentir sobrecarga emocional.',
    ],
    references: ['Programa Dignidade Menstrual – Ministério da Saúde 2025'],
  },
  {
    id: 'menopausa',
    categoryId: 'bem-estar',
    title: 'Climatério e Menopausa',
    summary: 'A transição para a fase não reprodutiva e como lidar com os sintomas.',
    text: 'O climatério é a fase da vida da mulher em que o corpo está passando da etapa reprodutiva para a não reprodutiva. Essa transição costuma acontecer entre os 40 e 65 anos.\n\nA menopausa é confirmada após 12 meses seguidos sem menstruar. Geralmente ocorre entre os 48 e 50 anos.\n\nSintomas comuns: fogachos, suores noturnos, alterações do sono, irritabilidade, irregularidade menstrual, ressecamento vaginal, urgência urinária e ganho de peso.\n\nProcure a UBS ao perceber os primeiros sintomas, quando eles afetam seu sono ou qualidade de vida, ou se houver sangramento após 1 ano sem menstruar.\n\nEssas informações não substituem avaliação médica.',
    tips: [
      'Durma em ambiente bem ventilado e use roupas em camadas.',
      'Evite fumo, excesso de álcool e cafeína.',
      'Pratique atividade física regularmente.',
      'Considere o uso de lubrificantes vaginais durante a relação sexual.',
      'Anote os momentos dos fogachos para identificar gatilhos.',
    ],
    references: ['Ministério da Saúde – Protocolos de Atenção Básica', 'Ebook Saúde da Mulher – SMS Brusque/SC'],
  },
  {
    id: 'autocuidado',
    categoryId: 'bem-estar',
    title: 'Autocuidado e Hábitos Saudáveis',
    summary: 'Cuidar da saúde é um ato de amor-próprio. Veja o que você pode fazer no dia a dia.',
    text: 'Cuidar da saúde é um ato de amor-próprio e deve fazer parte do cotidiano.\n\nProcure a UBS regularmente para:\n• Acompanhamento de rotina e vacinação\n• Planejamento familiar\n• Suporte emocional\n• Sempre que você precisar :)',
    tips: [
      'Tenha rotina de sono regular e alimentação equilibrada.',
      'Pratique atividade física pelo menos 3x por semana.',
      'Faça autoexame das mamas regularmente.',
      'Separe momentos de lazer e relaxamento.',
      'Evite uso abusivo de álcool, cigarro e automedicação.',
    ],
    references: ['Ministério da Saúde – Política Nacional de Atenção à Mulher'],
  },
  {
    id: 'violencia',
    categoryId: 'bem-estar',
    title: 'Violência Contra a Mulher',
    summary: 'Reconheça sinais de abuso e saiba onde buscar ajuda.',
    text: 'A violência contra a mulher é qualquer atitude ou comportamento que provoque morte, dor, sofrimento ou prejuízo físico, sexual ou emocional — dentro ou fora de casa.\n\nProcure ajuda se:\n• Sentir medo, vergonha, culpa ou estiver sendo ameaçada\n• Houver agressões físicas, sexuais ou controle de sua rotina\n• Precisar de apoio para sair de uma relação abusiva\n\nO que você pode fazer:\n• Buscar atendimento na UBS, CRAS, CREAS ou Delegacia da Mulher\n• Ligar para o 180 (Central de Atendimento à Mulher) — gratuito e sigiloso\n• Pedir ajuda a alguém de confiança e não se isolar\n\nLigue 180. É gratuito e sigiloso.',
    tips: [
      'Ligue 180 — Central de Atendimento à Mulher, gratuito e sigiloso.',
      'Busque atendimento na UBS, CRAS ou Delegacia da Mulher.',
      'Não se isole — peça ajuda a alguém de confiança.',
    ],
    references: ['Lei nº 11.340/2006 – Lei Maria da Penha', 'gov.br/mulheres'],
  },

  // ── TENTANDO ENGRAVIDAR ──────────────────────────────────────────────────────

  {
    id: 'periodo-fertil',
    categoryId: 'gravidez',
    title: 'Período Fértil: Entendendo seu Ciclo',
    summary: 'Mais simples do que parece. Entenda como funciona o período fértil na prática.',
    text: 'Entender seu ciclo é mais simples do que parece — e pode te ajudar muito se a ideia é engravidar.\n\nO ciclo começa no primeiro dia da menstruação e vai até o dia antes da próxima. Ele pode variar entre 21 e 36 dias — e isso é totalmente normal! Só 10% a 15% das mulheres têm aquele ciclo "perfeito" de 28 dias.\n\nO período fértil é aquela fase em que as chances de engravidar são maiores. De forma geral, em mulheres com ciclos regulares, ele costuma acontecer entre o 8º e o 19º dia do ciclo.\n\nSeu corpo dá sinais: muitas mulheres percebem uma sensação maior de umidade vaginal nesse período. A secreção fica mais elástica, clara, transparente e com textura escorregadia (tipo clara de ovo). Quando esses sinais aparecem, é bem provável que você esteja no período fértil.\n\nO mais importante é se observar. Acompanhar por alguns meses quando a menstruação vem, quanto tempo dura e como seu corpo reage ajuda muito a entender seu próprio ritmo.',
    tips: [
      'Anote o início e o fim de cada menstruação por pelo menos 3 meses.',
      'Observe as mudanças na secreção vaginal ao longo do mês.',
      'Use o calendário do app para acompanhar seu ciclo.',
      'Em caso de dificuldade para engravidar após 1 ano de tentativas, procure a UBS.',
    ],
    references: [
      'Programa Dignidade Menstrual – Ministério da Saúde 2025',
      'Ebook Saúde da Mulher – UNIFEBE',
      'Ministério da Saúde – Proteger e Cuidar dos Adolescentes',
    ],
  },
];
