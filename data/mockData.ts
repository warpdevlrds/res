import { Exercise, Workout, User, WorkoutExecution } from '@/types';

export const MOCK_EXERCISES: Exercise[] = [
  // Peito
  { id: 'ex1', name: 'Supino Reto', category: 'Peito', muscleGroups: ['Peitoral Maior'], description: 'Deitado no banco, empurre a barra para cima', equipment: 'Barra e Banco', difficulty: 'Intermedi?rio' },
  { id: 'ex2', name: 'Supino Inclinado', category: 'Peito', muscleGroups: ['Peitoral Superior'], description: 'Banco inclinado a 45 graus', equipment: 'Barra e Banco Inclinado', difficulty: 'Intermedi?rio' },
  { id: 'ex3', name: 'Flex?o de Bra?o', category: 'Peito', muscleGroups: ['Peitoral Maior', 'Tr?ceps'], description: 'No ch?o, empurre o corpo para cima', equipment: 'Nenhum', difficulty: 'Iniciante' },
  { id: 'ex4', name: 'Crucifixo', category: 'Peito', muscleGroups: ['Peitoral Maior'], description: 'Voador com halteres', equipment: 'Halteres', difficulty: 'Intermedi?rio' },
  { id: 'ex5', name: 'Paralelas', category: 'Peito', muscleGroups: ['Peitoral Maior', 'Tr?ceps'], description: 'Suspenso nas barras paralelas', equipment: 'Barras Paralelas', difficulty: 'Avan?ado' },
  
  // Costas
  { id: 'ex6', name: 'Barra Fixa', category: 'Costas', muscleGroups: ['Dorsal', 'B?ceps'], description: 'Puxada vertical at? o queixo', equipment: 'Barra Fixa', difficulty: 'Avan?ado' },
  { id: 'ex7', name: 'Remada Curvada', category: 'Costas', muscleGroups: ['Dorsal M?dio', 'Romboide'], description: 'Inclinado, puxe a barra em dire??o ao peito', equipment: 'Barra', difficulty: 'Intermedi?rio' },
  { id: 'ex8', name: 'Puxada Frontal', category: 'Costas', muscleGroups: ['Dorsal'], description: 'Puxada na polia alta', equipment: 'Pulley', difficulty: 'Intermedi?rio' },
  { id: 'ex9', name: 'Remada Unilateral', category: 'Costas', muscleGroups: ['Dorsal', 'Romboide'], description: 'Com halter, remada unilateral', equipment: 'Halter', difficulty: 'Intermedi?rio' },
  { id: 'ex10', name: 'Serrote', category: 'Costas', muscleGroups: ['Dorsal', 'Serr?til'], description: 'Puxada horizontal na polia', equipment: 'Pulley', difficulty: 'Intermedi?rio' },
  
  // Pernas
  { id: 'ex11', name: 'Agachamento Livre', category: 'Pernas', muscleGroups: ['Quadr?ceps', 'Gl?teos'], description: 'Agachamento profundo com barra', equipment: 'Barra', difficulty: 'Avan?ado' },
  { id: 'ex12', name: 'Leg Press', category: 'Pernas', muscleGroups: ['Quadr?ceps', 'Gl?teos'], description: 'Press?o de pernas no aparelho', equipment: 'Leg Press', difficulty: 'Iniciante' },
  { id: 'ex13', name: 'Agachamento Goblet', category: 'Pernas', muscleGroups: ['Quadr?ceps', 'Gl?teos'], description: 'Agachamento segurando halter no peito', equipment: 'Halter', difficulty: 'Intermedi?rio' },
  { id: 'ex14', name: 'Lunges', category: 'Pernas', muscleGroups: ['Quadr?ceps', 'Gl?teos'], description: 'Passada alternada', equipment: 'Halteres', difficulty: 'Intermedi?rio' },
  { id: 'ex15', name: 'Panturrilha em P?', category: 'Pernas', muscleGroups: ['Panturrilha'], description: 'Eleva??o de calcanhares', equipment: 'Nenhum', difficulty: 'Iniciante' },
  { id: 'ex16', name: 'Stiff', category: 'Pernas', muscleGroups: ['Posterior de Coxa'], description: 'RDL com barra', equipment: 'Barra', difficulty: 'Intermedi?rio' },
  { id: 'ex17', name: 'Mesa Flexora', category: 'Pernas', muscleGroups: ['Posterior de Coxa'], description: 'Flex?o de pernas no aparelho', equipment: 'Mesa Flexora', difficulty: 'Iniciante' },
  { id: 'ex18', name: 'Cadeira Extensora', category: 'Pernas', muscleGroups: ['Quadr?ceps'], description: 'Extens?o de pernas no aparelho', equipment: 'Cadeira Extensora', difficulty: 'Iniciante' },
  
  // Ombros
  { id: 'ex19', name: 'Desenvolvimento', category: 'Ombros', muscleGroups: ['Delt?ide Anterior'], description: 'Eleva??o da barra acima da cabe?a', equipment: 'Barra', difficulty: 'Intermedi?rio' },
  { id: 'ex20', name: 'Eleva??o Lateral', category: 'Ombros', muscleGroups: ['Delt?ide M?dio'], description: 'Eleva??o lateral com halteres', equipment: 'Halteres', difficulty: 'Iniciante' },
  { id: 'ex21', name: 'Eleva??o Frontal', category: 'Ombros', muscleGroups: ['Delt?ide Anterior'], description: 'Eleva??o frontal com halteres', equipment: 'Halteres', difficulty: 'Iniciante' },
  { id: 'ex22', name: 'Crucifixo Invertido', category: 'Ombros', muscleGroups: ['Delt?ide Posterior'], description: 'Voador invertido', equipment: 'Halteres', difficulty: 'Intermedi?rio' },
  { id: 'ex23', name: 'Remada Alta', category: 'Ombros', muscleGroups: ['Delt?ide M?dio'], description: 'Puxada vertical com barra', equipment: 'Barra', difficulty: 'Intermedi?rio' },
  
  // B?ceps
  { id: 'ex24', name: 'Rosca Direta', category: 'B?ceps', muscleGroups: ['B?ceps'], description: 'Flex?o de bra?os com barra', equipment: 'Barra', difficulty: 'Iniciante' },
  { id: 'ex25', name: 'Rosca Alternada', category: 'B?ceps', muscleGroups: ['B?ceps'], description: 'Rosca alternada com halteres', equipment: 'Halteres', difficulty: 'Iniciante' },
  { id: 'ex26', name: 'Rosca Martelo', category: 'B?ceps', muscleGroups: ['B?ceps', 'Antebra?o'], description: 'Rosca neutra com halteres', equipment: 'Halteres', difficulty: 'Intermedi?rio' },
  { id: 'ex27', name: 'Rosca Concentrada', category: 'B?ceps', muscleGroups: ['B?ceps'], description: 'Rosca sentado, bra?o apoiado', equipment: 'Halter', difficulty: 'Intermedi?rio' },
  { id: 'ex28', name: 'Rosca 21', category: 'B?ceps', muscleGroups: ['B?ceps'], description: '7 reps parciais + 7 reps completas', equipment: 'Barra', difficulty: 'Avan?ado' },
  
  // Tr?ceps
  { id: 'ex29', name: 'Tr?ceps Pulley', category: 'Tr?ceps', muscleGroups: ['Tr?ceps'], description: 'Extens?o na polia alta', equipment: 'Pulley', difficulty: 'Intermedi?rio' },
  { id: 'ex30', name: 'Tr?ceps Testa', category: 'Tr?ceps', muscleGroups: ['Tr?ceps'], description: 'Extens?o deitado com barra', equipment: 'Barra', difficulty: 'Intermedi?rio' },
  { id: 'ex31', name: 'Tr?ceps Coice', category: 'Tr?ceps', muscleGroups: ['Tr?ceps'], description: 'Extens?o unilateral inclinado', equipment: 'Halter', difficulty: 'Intermedi?rio' },
  { id: 'ex32', name: 'Mergulho', category: 'Tr?ceps', muscleGroups: ['Tr?ceps', 'Peitoral'], description: 'Dips nas barras paralelas', equipment: 'Barras Paralelas', difficulty: 'Avan?ado' },
  
  // Abd?men
  { id: 'ex33', name: 'Abdominal Crunch', category: 'Abd?men', muscleGroups: ['Reto Abdominal'], description: 'Flex?o de tronco deitado', equipment: 'Nenhum', difficulty: 'Iniciante' },
  { id: 'ex34', name: 'Prancha', category: 'Abd?men', muscleGroups: ['Core'], description: 'Estabiliza??o isom?trica', equipment: 'Nenhum', difficulty: 'Intermedi?rio' },
  { id: 'ex35', name: 'Eleva??o de Pernas', category: 'Abd?men', muscleGroups: ['Reto Abdominal'], description: 'Eleva??o de pernas suspenso', equipment: 'Barra Fixa', difficulty: 'Intermedi?rio' },
  { id: 'ex36', name: 'Russian Twist', category: 'Abd?men', muscleGroups: ['Obl?quos'], description: 'Rota??o de tronco sentado', equipment: 'Peso', difficulty: 'Intermedi?rio' },
  { id: 'ex37', name: 'Abdominal Infra', category: 'Abd?men', muscleGroups: ['Reto Abdominal'], description: 'Eleva??o de pernas deitado', equipment: 'Nenhum', difficulty: 'Iniciante' },
  
  // Cardio
  { id: 'ex38', name: 'Corrida', category: 'Cardio', muscleGroups: ['Cardiovascular'], description: 'Corrida cont?nua', equipment: 'Esteira', difficulty: 'Iniciante' },
  { id: 'ex39', name: 'Bicicleta Ergom?trica', category: 'Cardio', muscleGroups: ['Cardiovascular'], description: 'Pedalada cont?nua', equipment: 'Bicicleta', difficulty: 'Iniciante' },
  { id: 'ex40', name: 'Remo', category: 'Cardio', muscleGroups: ['Cardiovascular', 'Costas'], description: 'Remo no aparelho', equipment: 'Remo', difficulty: 'Intermedi?rio' },
  { id: 'ex41', name: 'Burpee', category: 'Cardio', muscleGroups: ['Cardiovascular', 'Corpo Inteiro'], description: 'Agachamento + flex?o + salto', equipment: 'Nenhum', difficulty: 'Avan?ado' },
  { id: 'ex42', name: 'Mountain Climber', category: 'Cardio', muscleGroups: ['Cardiovascular', 'Core'], description: 'Altern?ncia r?pida de pernas', equipment: 'Nenhum', difficulty: 'Intermedi?rio' },
  
  // Antebra?o
  { id: 'ex43', name: 'Rosca Punho', category: 'Antebra?o', muscleGroups: ['Antebra?o'], description: 'Flex?o de punho com barra', equipment: 'Barra', difficulty: 'Iniciante' },
  { id: 'ex44', name: 'Rosca Punho Inversa', category: 'Antebra?o', muscleGroups: ['Antebra?o'], description: 'Extens?o de punho', equipment: 'Barra', difficulty: 'Intermedi?rio' },
  
  // Gl?teos
  { id: 'ex45', name: 'Eleva??o P?lvica', category: 'Gl?teos', muscleGroups: ['Gl?teos'], description: 'Ponte deitado', equipment: 'Nenhum', difficulty: 'Iniciante' },
  { id: 'ex46', name: 'Afundo Bulgaro', category: 'Gl?teos', muscleGroups: ['Gl?teos', 'Quadr?ceps'], description: 'Agachamento unilateral com perna elevada', equipment: 'Halter', difficulty: 'Avan?ado' },
  { id: 'ex47', name: 'Caneleira Gl?teo', category: 'Gl?teos', muscleGroups: ['Gl?teos'], description: 'Extens?o de quadril no aparelho', equipment: 'Caneleira', difficulty: 'Iniciante' },
  
  // Trap?zio
  { id: 'ex48', name: 'Encolhimento', category: 'Trap?zio', muscleGroups: ['Trap?zio'], description: 'Encolhimento de ombros com barra', equipment: 'Barra', difficulty: 'Iniciante' },
  { id: 'ex49', name: 'Encolhimento com Halteres', category: 'Trap?zio', muscleGroups: ['Trap?zio'], description: 'Encolhimento alternado', equipment: 'Halteres', difficulty: 'Intermedi?rio' },
  
  // Posterior de Coxa
  { id: 'ex50', name: 'Good Morning', category: 'Posterior de Coxa', muscleGroups: ['Posterior de Coxa', 'Gl?teos'], description: 'Flex?o de tronco com barra', equipment: 'Barra', difficulty: 'Avan?ado' },
];

export const MOCK_STUDENTS: User[] = [
  {
    id: 'student1',
    name: 'Jo?o Silva',
    email: 'joao@example.com',
    role: 'student',
    phone: '(11) 98765-4321',
    joinDate: '2024-01-15',
    goals: ['Hipertrofia', 'Ganho de Massa'],
    level: 'Intermedi?rio',
  },
  {
    id: 'student2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    role: 'student',
    phone: '(11) 98765-4322',
    joinDate: '2024-02-01',
    goals: ['Emagrecimento', 'Defini??o'],
    level: 'Iniciante',
  },
  {
    id: 'student3',
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    role: 'student',
    phone: '(11) 98765-4323',
    joinDate: '2024-01-20',
    goals: ['For?a', 'Hipertrofia'],
    level: 'Avan?ado',
  },
  {
    id: 'student4',
    name: 'Ana Costa',
    email: 'ana@example.com',
    role: 'student',
    phone: '(11) 98765-4324',
    joinDate: '2024-02-10',
    goals: ['Resist?ncia', 'Sa?de'],
    level: 'Iniciante',
  },
];

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: 'workout1',
    name: 'Treino A - Peito e Tr?ceps',
    studentId: 'student1',
    studentName: 'Jo?o Silva',
    exercises: [
      {
        exerciseId: 'ex1',
        sets: 4,
        reps: 10,
        weight: 60,
        restSeconds: 90,
        notes: 'Controle a descida',
        order: 1,
      },
      {
        exerciseId: 'ex3',
        sets: 3,
        reps: 12,
        restSeconds: 60,
        order: 2,
      },
      {
        exerciseId: 'ex4',
        sets: 3,
        reps: 12,
        weight: 20,
        restSeconds: 60,
        order: 3,
      },
      {
        exerciseId: 'ex29',
        sets: 3,
        reps: 12,
        weight: 40,
        restSeconds: 60,
        order: 4,
      },
    ],
    createdAt: '2024-03-01T08:00:00Z',
    scheduledDate: '2024-03-15T18:00:00Z',
    completed: false,
  },
  {
    id: 'workout2',
    name: 'Treino B - Costas e B?ceps',
    studentId: 'student1',
    studentName: 'Jo?o Silva',
    exercises: [
      {
        exerciseId: 'ex6',
        sets: 4,
        reps: 8,
        restSeconds: 90,
        notes: 'Aten??o ? amplitude',
        order: 1,
      },
      {
        exerciseId: 'ex7',
        sets: 4,
        reps: 10,
        weight: 70,
        restSeconds: 90,
        order: 2,
      },
      {
        exerciseId: 'ex24',
        sets: 3,
        reps: 12,
        weight: 30,
        restSeconds: 60,
        order: 3,
      },
    ],
    createdAt: '2024-03-01T08:00:00Z',
    scheduledDate: '2024-03-17T18:00:00Z',
    completed: false,
  },
  {
    id: 'workout3',
    name: 'Treino Full Body',
    studentId: 'student2',
    studentName: 'Maria Santos',
    exercises: [
      {
        exerciseId: 'ex12',
        sets: 3,
        reps: 15,
        weight: 50,
        restSeconds: 60,
        order: 1,
      },
      {
        exerciseId: 'ex8',
        sets: 3,
        reps: 12,
        weight: 30,
        restSeconds: 60,
        order: 2,
      },
      {
        exerciseId: 'ex3',
        sets: 3,
        reps: 10,
        restSeconds: 45,
        order: 3,
      },
      {
        exerciseId: 'ex34',
        sets: 3,
        reps: 30,
        restSeconds: 45,
        notes: 'Manter 30 segundos',
        order: 4,
      },
    ],
    createdAt: '2024-03-05T08:00:00Z',
    scheduledDate: '2024-03-14T17:00:00Z',
    completed: true,
  },
];

export const MOCK_WORKOUT_EXECUTIONS: WorkoutExecution[] = [
  {
    id: 'exec1',
    workoutId: 'workout3',
    studentId: 'student2',
    startTime: '2024-03-14T17:00:00Z',
    endTime: '2024-03-14T17:45:00Z',
    exercises: [
      {
        exerciseId: 'ex12',
        sets: [
          { setNumber: 1, reps: 15, weight: 50, completed: true },
          { setNumber: 2, reps: 15, weight: 50, completed: true },
          { setNumber: 3, reps: 15, weight: 50, completed: true },
        ],
      },
      {
        exerciseId: 'ex8',
        sets: [
          { setNumber: 1, reps: 12, weight: 30, completed: true },
          { setNumber: 2, reps: 12, weight: 30, completed: true },
          { setNumber: 3, reps: 12, weight: 30, completed: true },
        ],
      },
    ],
    notes: 'Treino bem executado',
    rating: 5,
  },
];

export const EXERCISE_CATEGORIES = [
  'Peito',
  'Costas',
  'Pernas',
  'Ombros',
  'B?ceps',
  'Tr?ceps',
  'Abd?men',
  'Cardio',
  'Antebra?o',
  'Gl?teos',
  'Trap?zio',
  'Posterior de Coxa',
];

export const DIFFICULTY_LEVELS = ['Iniciante', 'Intermedi?rio', 'Avan?ado'];

export const EQUIPMENT_TYPES = [
  'Nenhum',
  'Barra',
  'Halter',
  'Halteres',
  'Pulley',
  'Esteira',
  'Bicicleta',
  'Banco',
  'Barra Fixa',
  'Barras Paralelas',
  'Leg Press',
  'Mesa Flexora',
  'Cadeira Extensora',
  'Remo',
  'Caneleira',
];
