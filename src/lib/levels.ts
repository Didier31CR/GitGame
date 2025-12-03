export const GAME_LEVELS = [
  {
    id: 1,
    title: 'Iniciar un Repositorio',
    description: '¿Qué comando utilizas para crear un nuevo repositorio Git?',
    scenario:
      'Tienes una carpeta de proyecto vacía y necesitas inicializar Git.',
    correctCommands: ['git init'],
    hint: "El comando comienza con 'git' y es muy simple. Se usa para inicializar.",
    points: 10,
    medal: '🌟 Primer Paso',
  },
  {
    id: 2,
    title: 'Ver el Estado',
    description:
      '¿Cuál es el comando para ver el estado actual del repositorio?',
    scenario:
      'Acabas de crear archivos en tu proyecto y quieres ver qué cambios hay.',
    correctCommands: ['git status'],
    hint: "Es 'git' seguido de una palabra que significa 'estado' en inglés.",
    points: 10,
    medal: '📊 Observador',
  },
  {
    id: 3,
    title: 'Agregar Archivos',
    description:
      '¿Cuál es el comando para agregar archivos al área de preparación?',
    scenario:
      'Tienes archivos modificados y quieres prepararlos para hacer commit.',
    correctCommands: ['git add .', 'git add *', 'git add archivo.txt'],
    hint: "Es 'git add' seguido de un patrón. Puedes usar '.' para todos los archivos.",
    points: 15,
    medal: '📝 Preparador',
  },
  {
    id: 4,
    title: 'Hacer Commit',
    description: '¿Cuál es el comando para guardar cambios con un mensaje?',
    scenario:
      'Tus cambios están preparados y quieres crear un punto de guardado.',
    correctCommands: [
      'git commit -m "mensaje"',
      'git commit',
      "git commit -m 'mensaje'",
    ],
    hint: "Es 'git commit'. Necesitas agregar -m para el mensaje y un texto descriptivo.",
    points: 20,
    medal: '💾 Guardador',
  },
  {
    id: 5,
    title: 'Ver el Historial',
    description: '¿Cuál es el comando para ver el historial de commits?',
    scenario:
      'Quieres revisar todos los cambios que has realizado hasta ahora.',
    correctCommands: ['git log'],
    hint: "Es 'git' seguido de una palabra que significa 'registro' en inglés.",
    points: 10,
    medal: '📜 Historiador',
  },
  {
    id: 6,
    title: 'Crear una Rama',
    description: '¿Cuál es el comando para crear y cambiar a una nueva rama?',
    scenario:
      'Quieres trabajar en una nueva característica sin afectar la rama principal.',
    correctCommands: [
      'git checkout -b nombre-rama',
      'git switch -c nombre-rama',
    ],
    hint: "Puedes usar 'git checkout -b' o 'git switch -c' seguido del nombre de la rama.",
    points: 20,
    medal: '🌿 Cultivador',
  },
  {
    id: 7,
    title: 'Cambiar de Rama',
    description: '¿Cuál es el comando para cambiar a una rama existente?',
    scenario:
      'Tienes varias ramas y necesitas cambiar a la rama principal (main).',
    correctCommands: [
      'git checkout main',
      'git checkout master',
      'git switch main',
    ],
    hint: "Usa 'git checkout' o 'git switch' seguido del nombre de la rama.",
    points: 15,
    medal: '🔄 Navegador',
  },
  {
    id: 8,
    title: 'Fusionar Ramas',
    description:
      '¿Cuál es el comando para fusionar una rama en la rama actual?',
    scenario:
      'Terminaste de trabajar en una rama y quieres integrar los cambios.',
    correctCommands: ['git merge nombre-rama'],
    hint: "Es 'git merge' seguido del nombre de la rama que quieres fusionar.",
    points: 25,
    medal: '🔗 Fusionador',
  },
  {
    id: 9,
    title: 'Enviar Cambios',
    description:
      '¿Cuál es el comando para enviar cambios a un repositorio remoto?',
    scenario:
      'Completaste tu trabajo local y quieres subirlo a GitHub o similar.',
    correctCommands: [
      'git push',
      'git push origin main',
      'git push origin master',
    ],
    hint: "Es 'git push' (y opcionalmente el nombre del remoto y rama).",
    points: 25,
    medal: '🚀 Lanzador',
  },
  {
    id: 10,
    title: 'Obtener Cambios',
    description:
      '¿Cuál es el comando para obtener cambios del repositorio remoto?',
    scenario: 'Tu compañero subió cambios y quieres actualizar tu copia local.',
    correctCommands: [
      'git pull',
      'git pull origin main',
      'git pull origin master',
    ],
    hint: "Es 'git pull' (y opcionalmente el nombre del remoto y rama).",
    points: 25,
    medal: '📥 Actualizador',
  },
];

export function verifyCommand(
  command: string,
  correctCommands: string[]
): boolean {
  const cmd = command.trim().toLowerCase();
  return correctCommands.some((correct) => {
    if (cmd.includes('"') || cmd.includes("'")) {
      return (
        cmd === correct.toLowerCase() ||
        cmd === correct.toLowerCase().replace(/"/g, "'")
      );
    }
    return cmd.includes(correct.toLowerCase().split(' ').slice(0, 2).join(' '));
  });
}
