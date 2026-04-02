<?php

function validateTask($input) : array {
    $errors = [];

    $title = trim($input['title'] ?? '');

    if ($title === '') {
        $errors['title'] = 'Title is required.';
    }
    elseif (strlen($title) > 100 ) {
        $errors['title'] = 'Title must be less than 100 characters.';
    }

    $description = trim($input['description'] ?? '');

    $allowed_priorities = ['Low', 'Medium', 'High'];
    $priority = $input['priority'] ?? 'Low';

    if (!in_array($priority, $allowed_priorities, true)) {
        $errors['priority'] = 'Priority must be Low, Medium, or High.';
        $priority = 'Low';
}

    $due = trim($input['due'] ?? '');
    if ($due !== '') {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $due)) { //regex for date format
            $errors['due'] = 'Date must be YYYY-MM-DD format.';
        } else {
            [$y, $m, $d] = explode('-', $due);
            if (!checkdate((int)$m, (int)$d, (int)$y)) {
                $errors['due'] = 'Invalid date.';
            }
        }
    }

    return [
        "valid" => empty($errors),
        "errors" => $errors,
        "data" => [
            'title' => $title, 
            'description' => $description,
            'priority' => $priority,
            'due' => $due],
    ];
}
