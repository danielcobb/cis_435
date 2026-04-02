<?php

require_once __DIR__ . '/../src/validation.php';
require_once __DIR__ . '/../src/csrf.php';
require_once __DIR__ . '/../src/storage.php';
require_once __DIR__ . '/../src/flash.php';

$errors = [];

$old = [
    'title' => '',
    'description' => '',
    'priority' => 'Low',
    'due' => '',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        flash_set('error', 'Invalid CSRF token.');
        header('Location: create.php');
        exit;
    }

    $result = validateTask($_POST);

   if ($result['valid']) {
    $task = [
        'id' => generate_id(),
        'title' => $result['data']['title'],
        'description' => $result['data']['description'],
        'priority' => $result['data']['priority'],
        'due' => $result['data']['due'],
        'completed' => false,
    ];

    $tasks = load_tasks();
    $tasks[] = $task;
    save_tasks($tasks);

    flash_set('success', 'Task "' .$task['title'] . '" created.');
    header('Location: index.php');
    exit;  
    } else {
        $errors = $result['errors'];
        $old = array_merge($old, $_POST);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Task - TaskPad</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
    </head>
    <body>
        <nav><a href="index.php">Back to Tasks</a></nav>
            <main class="container">
            <h1>Create New Task</h1>

            <?php $flash = flash_get(); ?>
            <?php if ($flash): ?>
                <div class="alert alert-<?= htmlspecialchars($flash['type']) ?>">
                    <?= htmlspecialchars($flash['message']) ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="create.php" novalidate>
            <form method="POST" action="create.php" novalidate>
                <?= csrf_field() ?>

            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="<?= htmlspecialchars($old['title']) ?>" required>
            <?php if (isset($errors['title'])): ?>
                <p class="error"><?= htmlspecialchars($errors['title']) ?></p>
            <?php endif; ?>

            <label for="description">Description:</label>
            <textarea id="description" name="description" rows="3"><?= htmlspecialchars($old['description'] ?? '') ?></textarea>
            
            <label for ="priority">Priority:</label>
            <select id="priority" name="priority">
                <?php foreach (['Low', 'Medium', 'High'] as $p): ?>
                    <option value="<?= $p ?>" 
                    <?= ($old['priority'] ?? '') === $p ? 'selected' : '' ?>>
                        <?= $p ?>
                    </option>
                <?php endforeach; ?>
                </select>
                <?php if (!empty($errors['priority'])): ?>
                    <p class="error"><?= htmlspecialchars($errors['priority']) ?></p>
                <?php endif; ?>
            
            <label for="due">Due Date:</label>
                <input type="date" id="due" name="due"
                value="<?= htmlspecialchars($old['due'] ?? '') ?>">
                <?php if (!empty($errors['due'])): ?>
                <p class="error"><?= htmlspecialchars($errors['due']) ?></p>
                <?php endif; ?>

            <button type="submit" class="btn">Add Task</button>
            </form>
        </main>
    </body>
</html>