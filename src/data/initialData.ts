import { AppData, AdminUser } from '../types';

export const defaultAdmins: AdminUser[] = [
  {
    entity_id: 'admin_1',
    username: 'dyon.gomes',
    password: '@gomes2026',
    name: 'Dyon Gomes',
    email: 'dyon.gomes@escola.ce.gov.br',
    role: 'Administrador Geral',
    created_at: '2026-01-01T00:00:00.000Z'
  },
  {
    entity_id: 'admin_2',
    username: 'terliane.sara',
    password: '@sara2026',
    name: 'Terliane Sara',
    email: 'terliane.sara@escola.ce.gov.br',
    role: 'Coordenadora Pedagógica',
    created_at: '2026-01-01T00:00:00.000Z'
  },
  {
    entity_id: 'admin_3',
    username: 'alberto.deyson',
    password: '@deyson2026',
    name: 'Alberto Deyson',
    email: 'alberto.deyson@escola.ce.gov.br',
    role: 'Gestor Administrativo',
    created_at: '2026-01-01T00:00:00.000Z'
  }
];

export const initialDefaultData: AppData = {
  admins: defaultAdmins,
  schools: [
    {
      entity_id: 'school_1',
      school_name: 'Escola Municipal Monteiro Lobato',
      school_city: 'Fortaleza - CE',
      school_contact: '(85) 3456-7890',
      created_at: new Date(Date.now() - 30 * 86400000).toISOString()
    },
    {
      entity_id: 'school_2',
      school_name: 'Colégio Estadual Castro Alves',
      school_city: 'Sobral - CE',
      school_contact: '(88) 3611-2233',
      created_at: new Date(Date.now() - 25 * 86400000).toISOString()
    }
  ],
  classes: [
    {
      entity_id: 'class_1',
      class_name: '8º Ano A',
      class_school_id: 'school_1',
      class_school_name: 'Escola Municipal Monteiro Lobato',
      class_teacher: 'Profª. Maria Helena',
      created_at: new Date(Date.now() - 24 * 86400000).toISOString()
    },
    {
      entity_id: 'class_2',
      class_name: '8º Ano B',
      class_school_id: 'school_1',
      class_school_name: 'Escola Municipal Monteiro Lobato',
      class_teacher: 'Prof. Carlos Eduardo',
      created_at: new Date(Date.now() - 23 * 86400000).toISOString()
    },
    {
      entity_id: 'class_3',
      class_name: '9º Ano A',
      class_school_id: 'school_2',
      class_school_name: 'Colégio Estadual Castro Alves',
      class_teacher: 'Profª. Roberta Lima',
      created_at: new Date(Date.now() - 22 * 86400000).toISOString()
    }
  ],
  students: [
    {
      entity_id: 'student_1',
      student_name: 'Maria Clara Silva',
      student_email: 'maria.silva',
      student_class_id: 'class_1',
      student_class_name: '8º Ano A',
      student_matricula: '123456',
      created_at: new Date(Date.now() - 20 * 86400000).toISOString()
    },
    {
      entity_id: 'student_2',
      student_name: 'João Pedro Santos',
      student_email: 'joao.pedro',
      student_class_id: 'class_1',
      student_class_name: '8º Ano A',
      student_matricula: '123456',
      created_at: new Date(Date.now() - 20 * 86400000).toISOString()
    },
    {
      entity_id: 'student_3',
      student_name: 'Ana Beatriz Souza',
      student_email: 'ana.beatriz',
      student_class_id: 'class_2',
      student_class_name: '8º Ano B',
      student_matricula: '123456',
      created_at: new Date(Date.now() - 19 * 86400000).toISOString()
    },
    {
      entity_id: 'student_4',
      student_name: 'Lucas Gabriel Moura',
      student_email: 'lucas.moura',
      student_class_id: 'class_2',
      student_class_name: '8º Ano B',
      student_matricula: '123456',
      created_at: new Date(Date.now() - 19 * 86400000).toISOString()
    },
    {
      entity_id: 'student_5',
      student_name: 'Camila Rocha Oliveira',
      student_email: 'camila.rocha',
      student_class_id: 'class_3',
      student_class_name: '9º Ano A',
      student_matricula: '123456',
      created_at: new Date(Date.now() - 18 * 86400000).toISOString()
    }
  ],
  activities: [
    {
      entity_id: 'act_1',
      activity_name: 'Interpretação Textual: Crônicas Urbanas',
      activity_class_id: 'class_1',
      activity_class_name: '8º Ano A',
      activity_discipline: 'Português',
      activity_due_date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      activity_description: 'Leitura da crônica "A Última Crônica" de Fernando Sabino e resolução dos exercícios de fixação sobre figuras de linguagem.',
      activity_link: 'https://pt.wikipedia.org/wiki/Cr%C3%B4nica_(g%C3%AAnero)',
      created_at: new Date(Date.now() - 10 * 86400000).toISOString()
    },
    {
      entity_id: 'act_2',
      activity_name: 'Equações de 1º Grau com Duas Incógnitas',
      activity_class_id: 'class_1',
      activity_class_name: '8º Ano A',
      activity_discipline: 'Matemática',
      activity_due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      activity_description: 'Resolução de sistemas lineares simples pelo método da substituição e da adição.',
      activity_link: 'https://pt.wikipedia.org/wiki/Sistema_de_equa%C3%A7%C3%B5es_lineares',
      created_at: new Date(Date.now() - 9 * 86400000).toISOString()
    },
    {
      entity_id: 'act_3',
      activity_name: 'Produção Textual: Carta Argumentativa',
      activity_class_id: 'class_2',
      activity_class_name: '8º Ano B',
      activity_discipline: 'Português',
      activity_due_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      activity_description: 'Elaboração de uma carta aberta sobre a importância da preservação ambiental na comunidade escolar.',
      created_at: new Date(Date.now() - 8 * 86400000).toISOString()
    },
    {
      entity_id: 'act_4',
      activity_name: 'Teorema de Pitágoras e Aplicações',
      activity_class_id: 'class_3',
      activity_class_name: '9º Ano A',
      activity_discipline: 'Matemática',
      activity_due_date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      activity_description: 'Calcular a hipotenusa e os catetos em triângulos retângulos aplicados a problemas do cotidiano.',
      activity_link: 'https://pt.wikipedia.org/wiki/Teorema_de_Pit%C3%A1goras',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString()
    },
    {
      entity_id: 'act_5',
      activity_name: 'Gêneros Jornalísticos: A Notícia',
      activity_class_id: 'class_1',
      activity_class_name: '8º Ano A',
      activity_discipline: 'Português',
      activity_due_date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
      activity_description: 'Análise de manchete, lide e corpo do texto em notícias de circulação nacional.',
      created_at: new Date(Date.now() - 18 * 86400000).toISOString()
    },
    {
      entity_id: 'act_6',
      activity_name: 'Operações com Frações e Decimais',
      activity_class_id: 'class_1',
      activity_class_name: '8º Ano A',
      activity_discipline: 'Matemática',
      activity_due_date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
      activity_description: 'Resolução de problemas práticos envolvendo adição, multiplicação e simplificação de frações.',
      created_at: new Date(Date.now() - 12 * 86400000).toISOString()
    }
  ],
  grades: [
    {
      entity_id: 'grade_6',
      grade_student_id: 'student_1',
      grade_student_name: 'Maria Clara Silva',
      grade_activity_id: 'act_5',
      grade_activity_name: 'Gêneros Jornalísticos: A Notícia',
      grade_value: 8.0,
      grade_feedback: 'Boa identificação dos elementos da notícia.',
      grade_date: new Date(Date.now() - 12 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 12 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_7',
      grade_student_id: 'student_1',
      grade_student_name: 'Maria Clara Silva',
      grade_activity_id: 'act_6',
      grade_activity_name: 'Operações com Frações e Decimais',
      grade_value: 8.5,
      grade_feedback: 'Ótimo raciocínio lógico nas operações com decimais.',
      grade_date: new Date(Date.now() - 6 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 6 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_8',
      grade_student_id: 'student_2',
      grade_student_name: 'João Pedro Santos',
      grade_activity_id: 'act_5',
      grade_activity_name: 'Gêneros Jornalísticos: A Notícia',
      grade_value: 7.5,
      grade_feedback: 'Atenção aos detalhes do lide na redação.',
      grade_date: new Date(Date.now() - 12 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 12 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_1',
      grade_student_id: 'student_1',
      grade_student_name: 'Maria Clara Silva',
      grade_activity_id: 'act_1',
      grade_activity_name: 'Interpretação Textual: Crônicas Urbanas',
      grade_value: 9.5,
      grade_feedback: 'Excelente interpretação e domínio da argumentação!',
      grade_date: new Date(Date.now() - 3 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_2',
      grade_student_id: 'student_2',
      grade_student_name: 'João Pedro Santos',
      grade_activity_id: 'act_1',
      grade_activity_name: 'Interpretação Textual: Crônicas Urbanas',
      grade_value: 8.0,
      grade_feedback: 'Bom trabalho! Fique atento à pontuação.',
      grade_date: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_3',
      grade_student_id: 'student_1',
      grade_student_name: 'Maria Clara Silva',
      grade_activity_id: 'act_2',
      grade_activity_name: 'Equações de 1º Grau com Duas Incógnitas',
      grade_value: 10.0,
      grade_feedback: 'Perfeito desenvolvimento algébrico!',
      grade_date: new Date(Date.now() - 1 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_4',
      grade_student_id: 'student_3',
      grade_student_name: 'Ana Beatriz Souza',
      grade_activity_id: 'act_3',
      grade_activity_name: 'Produção Textual: Carta Argumentativa',
      grade_value: 9.0,
      grade_feedback: 'Ótima coerência e coesão textual!',
      grade_date: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      entity_id: 'grade_5',
      grade_student_id: 'student_5',
      grade_student_name: 'Camila Rocha Oliveira',
      grade_activity_id: 'act_4',
      grade_activity_name: 'Teorema de Pitágoras e Aplicações',
      grade_value: 9.5,
      grade_feedback: 'Cálculos precisos e passos bem detalhados.',
      grade_date: new Date(Date.now() - 1 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ],
  posts: [
    {
      entity_id: 'post_1',
      post_content: '📢 Sejam todos bem-vindos ao ano letivo no Projeto 2+DOIS= Aprender! Lembrem-se de verificar o prazo de entrega das primeiras atividades de Português e Matemática.',
      post_author_id: 'admin',
      post_author_name: 'Coordenação Pedagógica',
      post_author_type: 'admin',
      post_is_pinned: true,
      post_link: 'https://novaescola.org.br',
      post_created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      entity_id: 'post_2',
      post_content: 'Olá professores e colegas! Já terminei os exercícios de crônicas e recomendo a leitura do livro complementar.',
      post_author_id: 'student_1',
      post_author_name: 'Maria Clara Silva',
      post_author_type: 'student',
      post_class_id: 'class_1',
      post_is_pinned: false,
      post_created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      entity_id: 'post_3',
      post_content: 'Parabéns Maria Clara! O hábito da leitura faz toda a diferença.',
      post_author_id: 'admin',
      post_author_name: 'Profª. Maria Helena',
      post_author_type: 'admin',
      post_is_pinned: false,
      post_parent_id: 'post_2',
      post_created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ],
  events: [
    {
      entity_id: 'event_1',
      title: 'Prova Bimestral de Matemática',
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      type: 'exam',
      discipline: 'Matemática',
      class_id: 'class_1',
      class_name: '8º Ano A',
      location: 'Sala 04',
      description: 'Conteúdo: Sistemas de Equações do 1º Grau e Teorema de Pitágoras. Trazer calculadora e régua.',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      entity_id: 'event_2',
      title: 'Feriado Nacional: Independência do Brasil',
      date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      type: 'holiday',
      description: 'Feriado nacional - não haverá expediente pedagógico nem aulas presenciais/remotas.',
      created_at: new Date(Date.now() - 15 * 86400000).toISOString()
    },
    {
      entity_id: 'event_3',
      title: 'Avaliação Diagnóstica de Língua Portuguesa',
      date: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0],
      type: 'exam',
      discipline: 'Português',
      class_id: 'class_1',
      class_name: '8º Ano A',
      location: 'Sala 04',
      description: 'Interpretação textual, gêneros crônica e notícia, figuras de linguagem e coesão.',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      entity_id: 'event_4',
      title: 'Reunião de Pais e Mestres (3º Bimestre)',
      date: new Date(Date.now() + 11 * 86400000).toISOString().split('T')[0],
      type: 'meeting',
      location: 'Auditório Principal',
      description: 'Apresentação do boletim de desempenho dos alunos, frequência e alinhamento com os responsáveis.',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      entity_id: 'event_5',
      title: 'Feira Cultural e de Ciências da Escola',
      date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      end_date: new Date(Date.now() + 16 * 86400000).toISOString().split('T')[0],
      type: 'event',
      location: 'Pátio Central e Laboratório',
      description: 'Exposição dos projetos práticos dos estudantes das turmas do 8º e 9º anos com premiações.',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      entity_id: 'event_6',
      title: 'Simulado Geral Interdisciplinar',
      date: new Date(Date.now() + 19 * 86400000).toISOString().split('T')[0],
      type: 'exam',
      discipline: 'Geral',
      description: 'Simulado com 40 questões estilo SAEB/Prova Brasil abrangendo Língua Portuguesa e Matemática.',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    },
    {
      entity_id: 'event_7',
      title: 'Recesso Escolar / Dia do Professor',
      date: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
      type: 'holiday',
      description: 'Homenagem e confraternização do corpo docente. Recesso para os alunos.',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ]
};
