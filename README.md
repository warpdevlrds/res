# Personal Trainer PWA

Uma aplica??o Progressive Web App (PWA) completa para personal trainers gerenciarem seus alunos e para alunos acompanharem seus treinos em tempo real durante os exerc?cios.

## ?? Funcionalidades

### Para Personal Trainers:
- ? Autentica??o e cria??o de conta
- ? Dashboard para gerenciar alunos
- ? Adicionar novos alunos
- ? Criar treinos personalizados com exerc?cios
- ? Visualizar treinos atribu?dos aos alunos
- ? Acompanhar progresso dos alunos

### Para Alunos:
- ? Autentica??o e cria??o de conta
- ? Visualizar treinos atribu?dos pelo personal trainer
- ? Interface otimizada para uso durante o treino
- ? Timer de descanso entre s?ries
- ? Marcador de s?ries e exerc?cios completados
- ? Progresso visual do treino
- ? Hist?rico de treinos conclu?dos

## ??? Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem est?tica
- **Tailwind CSS** - Estiliza??o moderna e responsiva
- **Zustand** - Gerenciamento de estado
- **next-pwa** - Configura??o PWA
- **date-fns** - Manipula??o de datas
- **lucide-react** - ?cones modernos

## ?? Instala??o

```bash
# Instalar depend?ncias
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produ??o
npm run build

# Executar produ??o
npm start
```

## ?? Como usar como PWA

1. Acesse o aplicativo no navegador
2. No mobile, adicione ? tela inicial quando solicitado
3. No desktop, use o menu do navegador para "Instalar aplicativo"

## ?? Caracter?sticas PWA

- ? Service Worker configurado
- ? Manifest.json para instala??o
- ? Funciona offline (dados salvos localmente)
- ? Interface responsiva e otimizada para mobile
- ? Temas e cores personalizadas

## ?? Estrutura do Projeto

```
??? app/                    # App Router do Next.js
?   ??? layout.tsx         # Layout principal
?   ??? page.tsx           # P?gina inicial
?   ??? globals.css        # Estilos globais
??? components/            # Componentes React
?   ??? LoginPage.tsx     # Tela de login/registro
?   ??? TrainerDashboard.tsx  # Dashboard do trainer
?   ??? StudentDashboard.tsx  # Dashboard do aluno
??? store/                 # Estado global (Zustand)
?   ??? store.ts          # Store principal
??? public/                # Arquivos est?ticos
?   ??? manifest.json     # Manifest PWA
??? package.json          # Depend?ncias
```

## ?? Autentica??o

Atualmente, o sistema usa autentica??o simplificada para demonstra??o. Em produ??o, recomenda-se integrar com:
- Firebase Auth
- Auth0
- NextAuth.js
- Ou seu pr?prio backend de autentica??o

## ?? Armazenamento

Os dados s?o salvos localmente usando Zustand com persist?ncia. Em produ??o, recomenda-se integrar com:
- Firebase Firestore
- Supabase
- MongoDB
- Ou seu pr?prio backend

## ?? Pr?ximos Passos

- [ ] Integra??o com backend real
- [ ] Autentica??o segura
- [ ] Notifica??es push
- [ ] Estat?sticas e gr?ficos de progresso
- [ ] Upload de fotos/v?deos dos exerc?cios
- [ ] Chat entre trainer e aluno
- [ ] Hist?rico detalhado de treinos
- [ ] Exporta??o de dados

## ?? Licen?a

Este projeto ? livre para uso pessoal e comercial.
