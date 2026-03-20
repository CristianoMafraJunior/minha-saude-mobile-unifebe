import { Category, ContentItem } from './types';

export const categories: Category[] = [
  {
    id: 'menstruacao',
    name: 'Menstruação',
    description: 'Ciclo, cólicas e saúde menstrual.',
    icon: 'Droplets',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'contracepcao',
    name: 'Contracepção',
    description: 'Métodos e planejamento familiar.',
    icon: 'ShieldCheck',
    color: 'bg-emerald-100 text-emerald-600',
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
  }
];

export const contentItems: ContentItem[] = [
  {
    id: 'corrimento',
    categoryId: 'menstruacao',
    title: 'Corrimento Vaginal: O que é normal?',
    summary: 'Entenda as variações do muco ao longo do ciclo.',
    text: 'Durante o ciclo da mulher, o muco pode apresentar características diferentes. O muco fisiológico é transparente ou claro, sem odor e não causa coceira. No período fértil, torna-se elástico e lubrificante, semelhante a clara de ovo.',
    tips: [
      'Mantenha a higiene íntima com água e sabão neutro.',
      'Evite roupas muito apertadas e tecidos sintéticos.',
      'Prefira dormir sem calcinha para ventilação.'
    ],
    references: ['Ministério da Saúde', 'Protocolos de Atenção Básica']
  },
  {
    id: 'colica',
    categoryId: 'menstruacao',
    title: 'Cólica: Como aliviar?',
    summary: 'Dicas para lidar com a dor menstrual em casa.',
    text: 'A cólica é uma dor na parte de baixo da barriga, comum em jovens após a menarca. Se a dor for muito forte ou acompanhada de febre, procure uma UBS.',
    tips: [
      'Faça compressas de água morna na região do abdômen.',
      'Pratique atividades físicas leves.',
      'Mantenha uma boa hidratação.'
    ],
    references: ['Ebook Saúde da Mulher - Brusque/SC']
  },
  {
    id: 'tpm',
    categoryId: 'bem-estar',
    title: 'Síndrome Pré-Menstrual (TPM)',
    summary: 'Alterações emocionais e físicas antes da menstruação.',
    text: 'A queda do estrogênio influencia neurotransmissores como a serotonina, causando irritabilidade ou sensibilidade. Alimentação e sono são fundamentais.',
    tips: [
      'Faça pequenas refeições equilibradas.',
      'Reduza o consumo de álcool e cafeína.',
      'Busque apoio psicológico se houver sobrecarga.'
    ],
    references: ['Política Nacional de Atenção à Mulher']
  },
  {
    id: 'menopausa',
    categoryId: 'bem-estar',
    title: 'Climatério e Menopausa',
    summary: 'A transição para a fase não reprodutiva.',
    text: 'O climatério ocorre geralmente entre 40 e 65 anos. A menopausa é confirmada após 12 meses sem menstruar. Sintomas comuns incluem fogachos e suores noturnos.',
    tips: [
      'Durma em ambientes bem ventilados.',
      'Use roupas em camadas fáceis de retirar.',
      'Evite fumo e excesso de café.'
    ],
    references: ['FEBRASGO', 'Ministério da Saúde']
  }
];
