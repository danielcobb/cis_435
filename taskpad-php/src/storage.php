<?php
define('TASKS_FILE', __DIR__ . '/../data/tasks.json');

function load_tasks() {
    if (!file_exists(TASKS_FILE)) {
        return [];
    }
    $json = file_get_contents(TASKS_FILE);
    return json_decode($json, true) ?? [];
}

function save_tasks($tasks) {
    $json = json_encode($tasks, JSON_PRETTY_PRINT);
    file_put_contents(TASKS_FILE, $json);
}

function generate_id(): string {
    return uniqid('task', true);
}