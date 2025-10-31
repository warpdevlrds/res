# Personal Trainer PWA - Especifica??o Completa

## ?? Vis?o Geral

Aplicativo PWA (Progressive Web App) para personal trainers gerenciarem seus alunos e para alunos acompanharem seus treinos em tempo real durante os exerc?cios.

---

## ?? Funcionalidades Principais

### 1. Autentica??o e Perfis de Usu?rio

#### Personal Trainer
- Login/Registro como personal trainer
- Perfil completo com:
  - Foto de perfil
  - Nome completo
  - Especialidades
  - Contato (telefone, email)
  - Hor?rios de atendimento
  - Bio/descri??o

#### Aluno
- Login/Registro como aluno
- Perfil completo com:
  - Foto de perfil
  - Nome completo
  - Data de nascimento
  - Peso atual
  - Altura
  - Objetivos de treino
  - Condi??es m?dicas/les?es
  - Contato de emerg?ncia

---

## ????? Painel do Personal Trainer

### 2. Gerenciamento de Alunos

#### Cadastro de Alunos
- Adicionar novos alunos manualmente
- Convite por link/email para alunos se cadastrarem
- Vincula??o de alunos existentes
- Lista completa de todos os alunos

#### Visualiza??o de Alunos
- Lista de alunos com foto e nome
- Busca/filtro de alunos
- Estat?sticas r?pidas:
  - Total de alunos
  - Alunos ativos
  - Alunos com treinos pendentes
  - Pr?ximos treinos agendados

#### Perfil do Aluno (visto pelo trainer)
- Informa??es completas do aluno
- Hist?rico de treinos
- Progresso (peso, medidas, fotos)
- Notas e observa??es do trainer
- Agenda de treinos
- Status de ades?o ao programa

---

### 3. Cria??o e Gest?o de Treinos

#### Cria??o de Treinos
- Templates de treino personaliz?veis
- Biblioteca de exerc?cios:
  - Nome do exerc?cio
  - Descri??o/instru??es
  - V?deo/GIF demonstrativo
  - M?sculos trabalhados
  - Equipamento necess?rio
  - N?vel de dificuldade
- Estrutura de treino:
  - Nome do treino
  - Descri??o/objetivos
  - Dura??o estimada
  - Partes do corpo trabalhadas
  - Lista de exerc?cios:
    - S?rie ? Repeti??es
    - Carga/peso
    - Tempo de descanso entre s?ries
    - Tempo de descanso entre exerc?cios
    - Observa??es espec?ficas
    - Ordem de execu??o

#### Biblioteca de Treinos
- Treinos pr?-cadastrados (reutiliz?veis)
- Templates por objetivo:
  - Hipertrofia
  - Emagrecimento
  - For?a
  - Resist?ncia
  - Mobilidade
  - Reabilita??o
- Categoriza??o por:
  - Parte do corpo
  - N?vel de dificuldade
  - Dura??o
  - Equipamento necess?rio

#### Atribui??o de Treinos
- Selecionar aluno(s)
- Escolher treino da biblioteca ou criar novo
- Definir data/hora do treino
- Agendar treinos recorrentes
- Enviar notifica??o para o aluno
- Prioridade/urg?ncia do treino

---

### 4. Acompanhamento de Progresso

#### M?tricas dos Alunos
- Peso (gr?fico de evolu??o)
- Medidas corporais (bra?o, peito, cintura, etc.)
- Fotos de progresso (antes/depois)
- Percentual de gordura
- Massa muscular
- Hist?rico de treinos realizados
- Taxa de ades?o aos treinos
- Tempo m?dio de treino
- Evolu??o de carga por exerc?cio

#### Relat?rios e An?lises
- Relat?rio semanal/mensal por aluno
- Compara??o de progresso entre alunos
- Estat?sticas gerais:
  - Treinos mais realizados
  - Exerc?cios mais frequentes
  - Hor?rios preferidos
  - Taxa de conclus?o de treinos

---

### 5. Comunica??o e Feedback

#### Mensagens
- Chat direto com cada aluno
- Mensagens em grupo (para turmas)
- Notifica??es push
- Hist?rico de conversas

#### Feedback nos Treinos
- Coment?rios nos treinos realizados
- Ajustes de carga para pr?ximos treinos
- Observa??es sobre execu??o
- Parab?ns e motiva??o

---

## ??? Painel do Aluno

### 6. Visualiza??o de Treinos

#### Lista de Treinos
- Treinos agendados (com data/hora)
- Treinos ativos do dia
- Hist?rico de treinos realizados
- Status de cada treino:
  - Agendado
  - Em andamento
  - Conclu?do
  - Pendente

#### Tela de Treino em Execu??o

##### Modo Treino (Durante o Exerc?cio)
- Interface otimizada para uso durante treino:
  - Tela grande e clara
  - Navega??o por gestos/swipe
  - Controles grandes e f?ceis de usar
- Visualiza??o do exerc?cio atual:
  - Nome do exerc?cio
  - S?rie atual (ex: "S?rie 2 de 4")
  - Repeti??es (ex: "12 repeti??es")
  - Carga sugerida
  - V?deo/GIF demonstrativo
  - Instru??es de execu??o
  - M?sculos trabalhados
- Controles de treino:
  - Bot?o "Concluir s?rie" (marca s?rie como feita)
  - Bot?o "Ajustar carga" (aumentar/diminuir peso)
  - Bot?o "Adicionar s?rie" (se necess?rio)
  - Bot?o "Pular exerc?cio" (com motivo)
  - Cron?metro de descanso autom?tico
  - Bot?o "Pr?ximo exerc?cio"
  - Bot?o "Finalizar treino"
- Cron?metro de descanso:
  - Contagem regressiva visual e sonora
  - Alerta quando descanso termina
  - Pausar/retomar descanso
- Navega??o:
  - Ver lista completa de exerc?cios do treino
  - Voltar para exerc?cio anterior
  - Ver progresso geral do treino
  - Tempo total de treino decorrido

##### Informa??es do Treino
- Nome do treino
- Data/hora agendada
- Dura??o estimada
- Objetivos do treino
- Lista completa de exerc?cios:
  - Status de cada exerc?cio (pendente/em andamento/conclu?do)
  - Ordem de execu??o
  - S?rie ? Repeti??es
  - Carga
  - Descanso

---

### 7. Acompanhamento de Progresso (Aluno)

#### Meu Progresso
- Gr?fico de evolu??o de peso
- Gr?fico de medidas corporais
- Galeria de fotos de progresso
- Estat?sticas pessoais:
  - Total de treinos realizados
  - Treinos na semana/m?s
  - Tempo total de treino
  - Evolu??o de carga por exerc?cio
  - Recordes pessoais
- Objetivos e metas:
  - Definir metas (peso, medidas, for?a)
  - Acompanhar progresso em rela??o ?s metas
  - Celebra??es ao atingir metas

---

### 8. Hist?rico de Treinos

#### Visualiza??o
- Lista cronol?gica de treinos realizados
- Filtros:
  - Por per?odo (semana, m?s, ano)
  - Por tipo de treino
  - Por status (conclu?do, incompleto)
- Detalhes de cada treino:
  - Data e hora de realiza??o
  - Dura??o real
  - Exerc?cios executados
  - Cargas utilizadas
  - Notas pessoais do aluno
  - Feedback do trainer (se houver)
  - Compara??o com treinos anteriores

---

### 9. Comunica??o com Trainer

#### Chat
- Mensagens diretas com o personal trainer
- Enviar fotos/v?deos de execu??o
- Perguntas sobre exerc?cios
- Solicitar ajustes no treino
- Notifica??es de novas mensagens

#### Notifica??es
- Treinos agendados
- Lembretes de treino
- Novas mensagens do trainer
- Novos treinos atribu?dos
- Feedback do trainer nos treinos

---

## ?? Funcionalidades Adicionais

### 10. Notifica??es e Lembretes

#### Para o Trainer
- Novo aluno cadastrado
- Treino pr?ximo do hor?rio agendado
- Aluno iniciou treino
- Aluno completou treino
- Mensagem nova do aluno

#### Para o Aluno
- Treino agendado para hoje
- Lembrete antes do treino (ex: 1 hora antes)
- Treino novo atribu?do
- Feedback do trainer
- Mensagem do trainer
- Meta atingida

---

### 11. Calend?rio e Agenda

#### Trainer
- Vista de calend?rio com todos os treinos agendados
- Filtrar por aluno
- Agendar novos treinos pelo calend?rio
- Mover/reagendar treinos
- Visualizar disponibilidade dos alunos

#### Aluno
- Vista de calend?rio com seus treinos
- Ver pr?ximos treinos agendados
- Solicitar reagendamento (se permitido)

---

### 12. Recursos Offline (PWA)

#### Funcionalidades Offline
- Visualizar treinos agendados
- Executar treino completo offline
- Registrar execu??o de exerc?cios
- Visualizar hist?rico local
- Sincroniza??o autom?tica quando online

#### Instala??o como App
- Instalar no celular (tela inicial)
- Funciona sem internet (modo offline)
- Notifica??es push
- ?cone personalizado
- Tela de splash

---

### 13. Recursos Multim?dia

#### V?deos e Imagens
- V?deos demonstrativos dos exerc?cios
- GIFs animados de execu??o
- Fotos de progresso (antes/depois)
- Biblioteca de v?deos do trainer
- Upload de v?deos de execu??o pelo aluno

---

### 14. Configura??es e Personaliza??o

#### Trainer
- Configura??es de conta
- Prefer?ncias de notifica??es
- Configura??es de privacidade
- Temas personalizados
- Idioma

#### Aluno
- Configura??es de conta
- Prefer?ncias de notifica??es
- Unidades de medida (kg/lb, cm/inch)
- Temas (claro/escuro)
- Idioma

---

### 15. Relat?rios e Exporta??o

#### Trainer
- Exportar relat?rios de alunos (PDF)
- Exportar hist?rico de treinos
- Estat?sticas gerais
- Relat?rios de progresso

#### Aluno
- Exportar pr?prio progresso
- Compartilhar conquistas
- Imprimir treinos

---

### 16. Seguran?a e Privacidade

- Autentica??o segura
- Dados criptografados
- LGPD compliance
- Controle de privacidade
- Backup autom?tico de dados
- Exclus?o de conta

---

## ?? Estrutura de Dados

### Entidades Principais

1. **User** (Trainer/Aluno)
   - Informa??es pessoais
   - Credenciais
   - Prefer?ncias

2. **Exercise** (Exerc?cio)
   - Nome, descri??o
   - V?deo/GIF
   - Categoria
   - M?sculos trabalhados

3. **Workout** (Treino)
   - Nome, descri??o
   - Lista de exerc?cios
   - Data/hora
   - Aluno associado

4. **WorkoutExecution** (Execu??o de Treino)
   - Treino executado
   - Data/hora de execu??o
   - Exerc?cios realizados
   - Cargas utilizadas
   - Notas

5. **Progress** (Progresso)
   - M?tricas (peso, medidas)
   - Fotos
   - Datas

6. **Message** (Mensagem)
   - Remetente/Destinat?rio
   - Conte?do
   - Data/hora

---

## ?? Interface e UX

### Design Principles
- **Mobile-first**: Otimizado para celular
- **Simplicidade**: Interface clara e intuitiva
- **Acessibilidade**: F?cil de usar durante treino
- **Performance**: Carregamento r?pido
- **Offline-first**: Funciona sem internet

### Tela de Treino (Prioridade)
- Bot?es grandes e acess?veis
- Contraste alto para legibilidade
- Navega??o por gestos
- Feedback visual e sonoro
- Modo paisagem quando necess?rio

---

## ?? Roadmap de Implementa??o

### Fase 1 - MVP (M?nimo Vi?vel)
- ? Autentica??o b?sica
- ? Dashboard do trainer
- ? Dashboard do aluno
- ? Cria??o de treinos
- ? Visualiza??o de treinos
- ? Execu??o de treino b?sica
- ? PWA b?sico

### Fase 2 - Funcionalidades Essenciais
- Gerenciamento completo de alunos
- Biblioteca de exerc?cios
- Cron?metro de descanso
- Hist?rico de treinos
- Mensagens b?sicas

### Fase 3 - Recursos Avan?ados
- Acompanhamento de progresso
- Relat?rios e estat?sticas
- V?deos e multim?dia
- Notifica??es push
- Offline completo

### Fase 4 - Otimiza??es
- Analytics avan?ado
- Integra??es (wearables, etc.)
- Recursos premium
- Multi-idioma
- Temas personalizados

---

## ?? Tecnologias Sugeridas

- **Frontend**: Next.js 14 (React)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **PWA**: next-pwa
- **Backend**: (Futuro) Next.js API Routes ou Backend separado
- **Database**: (Futuro) PostgreSQL/MongoDB
- **Storage**: (Futuro) Cloud Storage para imagens/v?deos
- **Auth**: (Futuro) NextAuth.js ou Auth0

---

## ?? Casos de Uso Principais

1. **Trainer cria treino para aluno**
   - Trainer acessa painel
   - Seleciona aluno
   - Cria/atribui treino
   - Aluno recebe notifica??o

2. **Aluno executa treino**
   - Aluno abre app
   - V? treino do dia
   - Inicia treino
   - Executa exerc?cios um por um
   - Marca s?ries como conclu?das
   - Usa cron?metro de descanso
   - Finaliza treino

3. **Trainer acompanha progresso**
   - Trainer acessa perfil do aluno
   - V? hist?rico de treinos
   - Analisa evolu??o de cargas
   - Ajusta treino baseado no progresso

4. **Comunica??o**
   - Aluno envia d?vida sobre exerc?cio
   - Trainer responde com orienta??o
   - Trainer d? feedback em treino realizado

---

Esta ? a especifica??o completa do aplicativo. Come?amos com um MVP funcional e podemos expandir gradualmente.
