---
title: Autonomiczni agenci programistyczni — notatki z wdrożenia
slug: agentic-coding-notatki
excerpt: Spostrzeżenia na temat orkiestracji modeli LLM, projektowania narzędzi MCP i optymalizacji pętli sprzężenia zwrotnego w zadaniach programistycznych.
date: 2026-10-19T10:00:00
draft: false
featured: false
tags:
  - ai-agenci
  - programowanie
seed: agents-notes-2026
blocks:
  - type: text
    body: |
      Praca z agentami programistycznymi wymaga odrzucenia założeń o monolitycznych promptach. Kluczowa okazuje się modularyzacja narzędzi i deterministyczna weryfikacja.

      Najważniejsze zasady:
      - Małe, weryfikowalne kroki z rzeczywistym uruchamianiem testów
      - Rygorystyczny schemat danych (TypeScript + Zod)
      - Osobne repozytoria wiedzy powiązane przez protokół MCP
  - type: code
    language: typescript
    filename: agent_dispatch.ts
    code: |
      interface TaskPayload {
        taskId: string;
        scope: string[];
        timeoutMs: number;
      }

      export async function dispatchWorker(task: TaskPayload): Promise<void> {
        console.log(`[DISPATCH] Uruchamianie agenta dla zadania: ${task.taskId}`);
      }
---

System orkiestracji ORCA pozwala na jednoczesne prowadzenie zadań w odizolowanych gałęziach Git, minimalizując ryzyko konfliktów w kodzie źródłowym.
