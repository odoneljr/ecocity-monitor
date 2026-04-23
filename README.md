# Projeto - Cidades ESG Inteligentes (EcoCity Monitor)

Projeto de monitoramento IoT para Smart Cities desenvolvido para a disciplina de DevOps, integrando sensores ESG com práticas de integração e entrega contínuas.

## Como executar localmente com Docker

Este projeto foi desenhado para rodar com orquestração completa em containers. Não é necessário ter Java ou Node instalados na máquina host.

1. Clone este repositório:
   `git clone https://github.com/[SEU_USUARIO]/ecocity-monitor.git`
2. Navegue até a pasta do projeto:
   `cd ecocity-monitor`
3. Execute o orquestrador do Docker:
   `docker compose up --build -d`
4. Acesse o Dashboard Frontend pelo navegador:
   `http://localhost`
5. A API estará respondendo em:
   `http://localhost:8080/api/sensors`

## Pipeline CI/CD

Utilizei o **GitHub Actions** para automatizar o ciclo de vida da aplicação. O pipeline `.github/workflows/ci-cd.yml` possui três etapas principais:

1. **Build e Teste:** Faz o setup do ambiente Amazon Corretto (Java 17), compila o backend e roda os testes unitários (`mvnw test`).
2. **Deploy Staging:** Após o sucesso dos testes, constrói as imagens Docker do Frontend e Backend e faz o push para o Docker Hub com a tag `:staging`.
3. **Deploy Produção:** Pega o artefato homologado no stage anterior, recria as imagens e envia para o Docker Hub com a tag `:production`, simulando a entrega final. Senhas de repositório foram protegidas usando _GitHub Secrets_.

## Containerização

O projeto possui uma arquitetura Multi-Container orquestrada via `docker-compose.yml`. Foram implementadas redes customizadas (`ecocity_network`) e volumes (`pgdata`) para persistência.

- **Backend:** Dockerfile Multi-stage (Build em Maven -> Run em Amazon Corretto Alpine).
- **Frontend:** Dockerfile Multi-stage (Build em Node 22 -> Run em Nginx Alpine).
- **Banco de Dados:** Imagem oficial do PostgreSQL 16 Alpine otimizada.

## Prints do funcionamento

_Consulte a apresentação em PDF/PPT em anexo para visualizar as evidências de:_

- Pipeline rodando com sucesso no GitHub Actions.
- Testes unitários passando.
- Aplicação rodando localmente (Dashboard React simulando sensores em tempo real).

## Tecnologias utilizadas

- **Backend:** Java 17, Spring Boot 3.2.5, Spring Data JPA, Hibernate.
- **Frontend:** React, Vite, Node.js 22, Axios.
- **Banco de Dados:** PostgreSQL 16.
- **DevOps:** Docker, Docker Compose, Nginx, GitHub Actions (CI/CD).

---

## Checklist de Entrega

| Item                                                | Status |
| :-------------------------------------------------- | :----: |
| Projeto compactado em .ZIP com estrutura organizada |   ☑️   |
| Dockerfile funcional                                |   ☑️   |
| docker-compose.yml ou arquivos Kubernetes           |   ☑️   |
| Pipeline com etapas de build, teste e deploy        |   ☑️   |
| README.md com instruções e prints                   |   ☑️   |
| Documentação técnica com evidências (PDF ou PPT)    |   ☑️   |
| Deploy realizado nos ambientes staging e produção   |   ☑️   |
