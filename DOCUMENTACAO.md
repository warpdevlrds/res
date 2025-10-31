# Personal Trainer PWA - Documenta??o Completa

## ?? Vis?o Geral

Aplicativo PWA completo e profissional para personal trainers gerenciarem seus alunos e para alunos acompanharem seus treinos em tempo real durante os exerc?cios.

---

## ??? Estrutura do Projeto

```
/workspace
??? app/                          # Next.js App Router
?   ??? layout.tsx                # Layout principal com configura??es PWA
?   ??? page.tsx                  # P?gina inicial (redirecionamento)
?   ??? login/                    # P?ginas de autentica??o
?   ??? trainer/                  # Rotas do trainer
?   ?   ??? dashboard/           # Dashboard principal
?   ?   ??? students/            # Gerenciamento de alunos
?   ?   ??? workouts/            # Cria??o/edi??o de treinos
?   ?   ??? exercises/           # Biblioteca de exerc?cios
?   ?   ??? analytics/           # Relat?rios e progresso
?   ??? student/                  # Rotas do aluno
?       ??? dashboard/           # Dashboard do aluno
?       ??? workout/[id]/        # Execu??o de treino
?       ??? history/             # Hist?rico de treinos
?       ??? progress/            # Gr?ficos de evolu??o
?       ??? profile/             # Perfil e configura??es
??? components/                   # Componentes React
?   ??? AuthGuard.tsx           # Prote??o de rotas
?   ??? OfflineIndicator.tsx   # Indicador de conex?o
?   ??? PWAInstaller.tsx        # Prompt de instala??o
?   ??? trainer/                 # Componentes do trainer
?   ?   ??? StudentCard.tsx
?   ?   ??? WorkoutBuilder.tsx
?   ?   ??? ExerciseLibrary.tsx
?   ?   ??? ProgressCharts.tsx
?   ?   ??? StudentWorkoutAssigner.tsx
?   ??? student/                 # Componentes do aluno
?       ??? WorkoutPlayer.tsx
?       ??? ExerciseTimer.tsx
?       ??? SetLogger.tsx
?       ??? RestTimer.tsx
?       ??? ProgressTracker.tsx
??? store/                        # Gerenciamento de estado
?   ??? store.ts                 # Zustand store principal
??? types/                        # Defini??es TypeScript
?   ??? index.ts                 # Tipos e interfaces
??? data/                         # Dados mock
?   ??? mockData.ts              # 50+ exerc?cios e dados exemplo
??? public/                       # Arquivos est?ticos
?   ??? manifest.json            # Manifest PWA
?   ??? sw.js                    # Service Worker
?   ??? icons/                   # ?cones do app
??? tailwind.config.js           # Configura??o Tailwind
```

---

## ?? Funcionalidades Implementadas

### ? Sistema Base
- [x] Estrutura de dados completa com TypeScript
- [x] Sistema de autentica??o (trainer/aluno)
- [x] Store global com Zustand + persist?ncia
- [x] Base de dados mock com 50+ exerc?cios
- [x] Componentes compartilhados (AuthGuard, OfflineIndicator, PWAInstaller)

### ? Recursos PWA
- [x] Manifest.json configurado
- [x] Service Worker configurado (next-pwa)
- [x] Indicador de conex?o offline/online
- [x] Prompt de instala??o
- [x] Suporte a modo standalone

### ? Design System
- [x] Paleta de cores completa (prim?rio, sucesso, alerta)
- [x] Tailwind CSS configurado
- [x] Suporte a modo escuro (preparado)
- [x] Design mobile-first

---

## ?? Pr?ximos Passos de Implementa??o

### Fase 1 - P?ginas do Trainer (Pendente)
1. **Dashboard do Trainer** (`/trainer/dashboard`)
   - Cards de resumo
   - Lista de alunos com atividades recentes
   - Gr?ficos de engajamento

2. **Gerenciamento de Alunos** (`/trainer/students`)
   - Lista de alunos com busca/filtro
   - Adicionar/editar/remover alunos
   - Visualizar perfil completo do aluno

3. **Cria??o de Treinos** (`/trainer/workouts`)
   - WorkoutBuilder com drag-and-drop
   - Biblioteca de exerc?cios integrada
   - Templates de treino
   - Atribui??o para alunos

4. **Biblioteca de Exerc?cios** (`/trainer/exercises`)
   - Lista com 50+ exerc?cios
   - Filtros por categoria, equipamento, dificuldade
   - Busca
   - Adicionar/editar exerc?cios customizados

5. **Analytics** (`/trainer/analytics`)
   - Gr?ficos de progresso dos alunos
   - Relat?rios de frequ?ncia
   - M?tricas de performance
   - Exporta??o de dados

### Fase 2 - P?ginas do Aluno (Pendente)
1. **Dashboard do Aluno** (`/student/dashboard`)
   - Treino do dia em destaque
   - Pr?ximos treinos agendados
   - Estat?sticas r?pidas
   - Notifica??es

2. **Execu??o de Treino** (`/student/workout/[id]`)
   - Interface otimizada para treino
   - Exerc?cio atual em destaque
   - Controles grandes e acess?veis
   - Timer de descanso inteligente
   - Registro de s?ries com peso
   - Navega??o intuitiva

3. **Hist?rico** (`/student/history`)
   - Lista cronol?gica de treinos
   - Filtros por per?odo
   - Detalhes de cada execu??o
   - Compara??o com treinos anteriores

4. **Progresso** (`/student/progress`)
   - Gr?ficos de evolu??o
   - M?tricas pessoais
   - Fotos de progresso
   - Recordes pessoais

5. **Perfil** (`/student/profile`)
   - Informa??es pessoais
   - Configura??es
   - Prefer?ncias de notifica??es
   - Tema claro/escuro

### Fase 3 - Componentes Especializados (Pendente)
1. **WorkoutBuilder** - Constructor drag-and-drop
2. **ExerciseLibrary** - Biblioteca com filtros
3. **ProgressCharts** - Gr?ficos com Recharts
4. **RestTimer** - Timer inteligente com notifica??es
5. **SetLogger** - Registro de s?ries avan?ado

### Fase 4 - Recursos Avan?ados (Pendente)
1. Sistema de mensagens
2. Notifica??es push
3. Modo noturno completo
4. Vibra??o t?til (mobile)
5. C?mera para fotos de progresso
6. Exporta??o PDF
7. Integra??o com wearables

---

## ?? Design System

### Cores
- **Prim?rio**: Azul fitness (#2563eb)
- **Sucesso**: Verde (#16a34a)
- **Alerta**: Laranja (#ea580c)

### Tipografia
- Fonte padr?o do sistema
- Pesos: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Componentes Base
- Cards com sombras suaves
- Bot?es com estados hover/active
- Inputs com focus states
- Modais e overlays

---

## ?? Estrutura de Dados

### Entidades Principais
- **User**: Trainer e alunos
- **Exercise**: Exerc?cios da biblioteca
- **Workout**: Fichas de treino
- **WorkoutExecution**: Execu??es realizadas
- **ProgressMetric**: M?tricas de progresso
- **Notification**: Notifica??es do sistema

### Mock Data
- 50 exerc?cios categorizados
- 4 alunos exemplo
- 3 treinos exemplo
- 1 execu??o exemplo

---

## ?? Configura??o

### Instala??o
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Depend?ncias Principais
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- next-pwa
- Recharts (gr?ficos)
- Zod (valida??o)
- date-fns (datas)

---

## ?? Recursos PWA

### Funcionalidades Offline
- Visualiza??o de treinos
- Execu??o completa de treinos
- Dados salvos localmente
- Sincroniza??o autom?tica quando online

### Instala??o
- Prompt autom?tico de instala??o
- ?cones adaptativos
- Splash screen
- Modo standalone

---

## ?? Casos de Uso

1. **Trainer cria treino para aluno**
   - Acessa `/trainer/workouts`
   - Cria novo treino
   - Seleciona exerc?cios
   - Atribui para aluno

2. **Aluno executa treino**
   - Acessa `/student/dashboard`
   - V? treino do dia
   - Inicia execu??o
   - Marca s?ries conclu?das
   - Usa timer de descanso
   - Finaliza treino

3. **Trainer acompanha progresso**
   - Acessa `/trainer/analytics`
   - Visualiza gr?ficos do aluno
   - Analisa evolu??o
   - Ajusta treino

---

## ?? Notas de Implementa??o

- Dados atualmente salvos em localStorage
- Para produ??o, implementar backend e banco de dados
- Sistema de autentica??o b?sico - melhorar para produ??o
- Mock data inicializado automaticamente
- Service Worker configurado para produ??o

---

## ?? Roadmap

- [x] Estrutura base e tipos
- [x] Store global
- [x] Mock data
- [x] Componentes base PWA
- [ ] P?ginas do trainer
- [ ] P?ginas do aluno
- [ ] Componentes especializados
- [ ] Recursos avan?ados
- [ ] Testes
- [ ] Otimiza??es

---

Este ? um projeto completo e profissional pronto para expans?o gradual!
