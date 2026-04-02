<?php

require_once __DIR__ . '/../src/csrf.php';
require_once __DIR__ . '/../src/storage.php';
require_once __DIR__ . '/../src/flash.php';

$tasks = load_tasks();

$q = trim($_GET['q'] ?? '');
$priority = $_GET['priority'] ?? '';

$filtered = array_filter($tasks, function ($task) use ($q, $priority) {
    if ($q !== '') {
        $haystack = strtolower($task['title'] . ' ' . $task['description']);
        if (strpos($haystack, strtolower($q)) === false) {
            return false;
        }
    }

    if ($priority !== '' && $task['priority'] !== $priority) {
        return false;
    }

    return true;
});

$flash = flash_get();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskPad</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
</head>
<body>
    <main class="container">
        <header class="page-header">
            <h1>TaskPad</h1>
            <a href="create.php" class="btn">New Task</a>
        </header>

        <?php if ($flash): ?>
            <div class="alert alert-<?= htmlspecialchars($flash['type']) ?>">
                <?= htmlspecialchars($flash['message']) ?>
            </div>
        <?php endif; ?>

        <form method="GET" action="index.php" class="filter-bar" >
            <input type="text" name="q" placeholder="Search tasks..." value="<?= htmlspecialchars($q) ?>">
            <select name="priority">
                <option value="">All Priorities</option>
                <option value="Low" <?= $priority === 'Low' ? 'selected' : '' ?>>Low</option>
                <option value="Medium" <?= $priority === 'Medium'
                    ? 'selected' : '' ?>>Medium</option>
                <option value="High" <?= $priority === 'High' ? 'selected' : '' ?>>High</option>
            </select>
            <button type="submit" class="btn">Filter</button>
        </form>

        <p class="count">Showing <?= count($filtered) ?> of <?= count($tasks) ?> tasks</p>

        <?php if(empty($tasks)): ?>
            <div class="empty-state">
                <p>No tasks found. <a href="create.php">Create your first task!</a></p>
            </div>
            <?php elseif (empty($filtered)): ?>
                <div class="empty-state">
                    <p>No tasks match your search. <a href="index.php">Clear filters</a></p>
                </div>
            <?php else: ?>
                <ul class="task-list">
                    <?php foreach ($filtered as $task): ?>
                        <li class="task-card <?= $task['completed'] ? 'completed' : '' ?>">
                            <div class="task-info">
                                <span class="badge badge-<?= strtolower($task['priority']) ?>">
                                    <?= htmlspecialchars($task['priority']) ?>
                                </span>
                                <span class="badge badge-state">
                                    <?= $task['completed'] ? 'Completed' : 'Open' ?>
                                </span>
                                <h3><?= htmlspecialchars($task['title']) ?></h3>
                                <?php if ($task['description']): ?>
                                    <p><?=htmlspecialchars($task['description']) ?></p>
                                <?php endif; ?>
                                <?php if ($task['due']): ?>
                                    <small>Due: <?= htmlspecialchars($task['due']) ?></small>
                                <?php endif; ?>
                            </div>
                            <div class="task-actions">
                                <?php if (!$task['completed']): ?>
                                    <form method="POST" action="actions.php">
                                        <?= csrf_field() ?>
                                        <input type="hidden" name="action" value="complete">
                                        <input type="hidden" name="id" 
                                                value="<?= htmlspecialchars($task['id']) ?>">
                                        <button type="submit" class="btn btn-sm btn-success">Complete</button>
                                    </form>
                                <?php endif; ?>
                                <form method="POST" action="actions.php">
                                    <?= csrf_field() ?>
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="id"
                                            value="<?= htmlspecialchars($task['id']) ?>">
                                    <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                                </form>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
        <?php endif; ?>
    </main>
</body>
</html>
