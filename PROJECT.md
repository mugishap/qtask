```
📦 
├─ README.md
├─ backend-service
│  ├─ .dockerignore
│  ├─ .env.example
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ .prettierrc
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ nest-cli.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.module.ts
│  │  ├─ config
│  │  │  └─ app.config.ts
│  │  ├─ filters
│  │  │  └─ AppExceptionFilter.ts
│  │  ├─ guards
│  │  │  └─ auth.guard.ts
│  │  ├─ main.ts
│  │  ├─ modules
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  ├─ auth.module.ts
│  │  │  │  ├─ auth.service.ts
│  │  │  │  └─ dto
│  │  │  │     └─ login.dto.ts
│  │  │  ├─ excel
│  │  │  │  ├─ excel.controller.ts
│  │  │  │  ├─ excel.module.ts
│  │  │  │  └─ excel.service.ts
│  │  │  ├─ files
│  │  │  │  ├─ files.controller.ts
│  │  │  │  ├─ files.module.ts
│  │  │  │  └─ files.service.ts
│  │  │  ├─ health
│  │  │  │  ├─ health.controller.ts
│  │  │  │  └─ health.module.ts
│  │  │  ├─ project
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-project.dto.ts
│  │  │  │  │  └─ update-project.dto.ts
│  │  │  │  ├─ project.controller.ts
│  │  │  │  ├─ project.module.ts
│  │  │  │  └─ project.service.ts
│  │  │  ├─ stats
│  │  │  │  ├─ stats.controller.ts
│  │  │  │  ├─ stats.module.ts
│  │  │  │  └─ stats.service.ts
│  │  │  ├─ task
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ add-file.dto.ts
│  │  │  │  │  ├─ create-task.dto.ts
│  │  │  │  │  ├─ file.dto.ts
│  │  │  │  │  └─ update-task.dto.ts
│  │  │  │  ├─ task.controller.ts
│  │  │  │  ├─ task.module.ts
│  │  │  │  └─ task.service.ts
│  │  │  └─ user
│  │  │     ├─ dto
│  │  │     │  ├─ create-user.dto.ts
│  │  │     │  └─ update-user.dto.ts
│  │  │     ├─ user.controller.ts
│  │  │     ├─ user.module.ts
│  │  │     └─ user.service.ts
│  │  ├─ prisma
│  │  │  ├─ migrations
│  │  │  │  ├─ 20230809085321_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809085710_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809093822_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809094102_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809094751_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809124000_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809150555_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809154749_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230809171626_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230810134346_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230810171348_init
│  │  │  │  │  └─ migration.sql
│  │  │  │  └─ migration_lock.toml
│  │  │  ├─ prisma.module.ts
│  │  │  ├─ prisma.service.ts
│  │  │  └─ schema.prisma
│  │  ├─ types
│  │  │  └─ index.d.ts
│  │  └─ utils
│  │     ├─ ServerResponse.ts
│  │     ├─ cors.ts
│  │     └─ generators
│  │        └─ index.sh
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  └─ yarn.lock
└─ frontend-service
   ├─ .dockerignore
   ├─ .eslintrc.cjs
   ├─ .gitignore
   ├─ Dockerfile
   ├─ README.md
   ├─ index.html
   ├─ package.json
   ├─ postcss.config.js
   ├─ src
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ Pages.tsx
   │  ├─ api
   │  │  ├─ index.ts
   │  │  └─ url.ts
   │  ├─ assets
   │  │  ├─ images
   │  │  │  └─ logo.png
   │  │  └─ index.ts
   │  ├─ components
   │  │  ├─ projects
   │  │  │  ├─ CreateProject.tsx
   │  │  │  └─ Project.tsx
   │  │  ├─ sidebar
   │  │  │  └─ Sidebar.tsx
   │  │  ├─ task
   │  │  │  ├─ CreateTask.tsx
   │  │  │  ├─ DownloadPopup.tsx
   │  │  │  └─ Task.tsx
   │  │  └─ users
   │  │     └─ User.tsx
   │  ├─ constants
   │  │  └─ index.ts
   │  ├─ context
   │  │  └─ index.ts
   │  ├─ hooks
   │  │  └─ index.ts
   │  ├─ index.css
   │  ├─ layout
   │  │  ├─ AuthLayout.tsx
   │  │  ├─ Layout.tsx
   │  │  └─ ModalLayout.tsx
   │  ├─ main.tsx
   │  ├─ pages
   │  │  ├─ 404
   │  │  │  └─ NotFound.tsx
   │  │  ├─ auth
   │  │  │  ├─ login
   │  │  │  │  └─ Login.tsx
   │  │  │  └─ signup
   │  │  │     └─ Signup.tsx
   │  │  ├─ home
   │  │  │  └─ Home.tsx
   │  │  ├─ profile
   │  │  │  └─ Profile.tsx
   │  │  ├─ project
   │  │  │  └─ ProjectPage.tsx
   │  │  ├─ projects
   │  │  │  └─ Projects.tsx
   │  │  ├─ task
   │  │  │  └─ TaskPage.tsx
   │  │  ├─ tasks
   │  │  │  └─ Tasks.tsx
   │  │  └─ users
   │  │     └─ Users.tsx
   │  ├─ redux
   │  │  ├─ slices
   │  │  │  ├─ projectReducer.tsx
   │  │  │  ├─ statsReducer.tsx
   │  │  │  ├─ taskReducer.tsx
   │  │  │  └─ userReducer.tsx
   │  │  └─ store.ts
   │  ├─ theme
   │  │  └─ index.ts
   │  ├─ types
   │  │  └─ index.d.ts
   │  ├─ utils
   │  │  ├─ arrays.ts
   │  │  ├─ date.ts
   │  │  └─ file.ts
   │  └─ vite-env.d.ts
   ├─ tailwind.config.js
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   ├─ vercel.json
   ├─ vite.config.ts
   └─ yarn.lock
```