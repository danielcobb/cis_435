<?php
require_once __DIR__ . '/../src/validation.php';

$tests = [
    [
        'id' => 'TC01',
        'description' => 'Happy Path',
        'input' => [
            'title' => 'Pet cats',
            'description' => 'Pet cats so they dont kill me',
            'priority' => 'High',
            'due' => '2026-04-01'
        ],
        'expectedValid' => true
    ],
    [
        'id' => 'TC02',
        'description' => 'Missing title',
        'input' => [
            'title' => '',
            'description' => 'This task is missing a title',
            'priority' => 'Medium',
            'due' => '2026-04-02'
        ],
        'expectedValid' => false
    ],
    [
        'id' => 'TC03',
        'description' => 'Invalid priority',
        'input' => [
            'title' => 'Eat food',
            'description' => '',
            'priority' => 'Urgent',
            'due' => '2026-04-03'
        ],
        'expectedValid' => false
    ],
    [
        'id' => 'TC04',
        'description' => 'Invalid date format',
        'input' => [
            'title' => 'Make waffles',
            'description' => '',
            'priority' => 'Low',
            'due' => '03-30-2026'
        ],
        'expectedValid' => false
    ],
    [
        'id' => 'TC05',
        'description' => 'Invalid date i.e. Aprill 33',
        'input' => [
            'title' => 'Test task',
            'description' => '',
            'priority' => 'High',
            'due' => '2026-04-33'
        ],
        'expectedValid' => false
    ],
    [
        'id' => 'TC06',
        'description' => 'Title > 200 characters',
        'input' => [
            'title' => str_repeat('a', 201),
            'description' => '',
            'priority' => 'Low',
            'due' => ''
        ],
        'expectedValid' => false
    ],
    [
        'id' => 'TC07',
        'description' => 'Valid task with optional fields left empty',
        'input' => [
            'title' => 'Simple task',
            'description' => '',
            'priority' => 'Low',
            'due' => ''
        ],
        'expectedValid' => true
    ],
    [
        'id' => 'TC08',
        'description' => 'Title with only spaces',
        'input' => [
            'title' => '   ',
            'description' => '',
            'priority' => 'Medium',
            'due' => ''
        ],
        'expectedValid' => false
    ],

    [
        'id' => 'TC09',
        'description' => 'Empty Priority',
        'input' => [
            'title' => 'Wash dishes',
            'description' => '',
            'priority' => '',
            'due' => ''
        ],
        'expectedValid' => false
    ],

    [
        'id' => 'TC10',
        'description' => 'High priority task',
        'input' => [
            'title' => 'Important task',
            'description' => '',
            'priority' => 'High',
            'due' => ''
        ],
        'expectedValid' => true
    ],
];

$passed = 0;
$total = count($tests);

foreach ($tests as $test) {
    $result = validateTask($test['input']);
    $isValid = $result['valid'];

    $ok = ($isValid === $test['expectedValid']);

    if ($ok) {
        echo "[PASS] {$test['id']} - {$test['description']}\n";
        $passed++;
    } else {
        echo "[FAIL] {$test['id']} - {$test['description']}\n";
        echo "  Expected valid = " . ($test['expectedValid'] ? 'true' : 'false') . "\n";
        echo "  Actual valid   = " . ($isValid ? 'true' : 'false') . "\n";
        if (!empty($result['errors'])) {
            echo "  Errors: " . implode(', ', $result['errors']) . "\n";
        }
    }
}

echo "\nPassed $passed out of $total tests.\n";