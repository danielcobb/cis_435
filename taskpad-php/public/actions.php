<?php
require_once __DIR__ . '/../src/csrf.php';
require_once __DIR__ . '/../src/storage.php';
require_once __DIR__ . '/../src/flash.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

if (!csrf_verify($_POST['csrf_token'] ?? '')) {
    die('Invalid CSRF token.');
}

$action = $_POST['action'] ?? '';
$id = $_POST['id'] ?? '';
$tasks = load_tasks();
$found = false;

switch ($action) {
    case 'complete':
        foreach ($tasks as &$task) {
            if ($task['id'] === $id) {
                $task['completed'] = true;
                $found = true;
                break;
            }
        }
        unset($task);
        if ($found) {
            save_tasks($tasks);
            flash_set('success', 'Task complete!');
        }else{
            flash_set('error', 'Task not found.');
        }
        break;

    case 'delete':
        $original_count = count($tasks);
        $tasks = array_filter($tasks, fn($t) => $t['id'] !== $id);
        if (count($tasks) < $original_count) {
            save_tasks($tasks);
            flash_set('success', 'Task deleted.');
        } else {
            flash_set('error', 'Task not found.');
        }
        break;

    default:
        flash_set('error', 'Unknown error.');
}

header('Location: index.php');
exit;