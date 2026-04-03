# **Test plan for task pad**

## 1. Run run_tests.php- This will output basic automated tests.

## 2. Manual tests to view status codes and other behavior.

### a. Create a valid task. Expected status 302 and redirect to index.php. PASSED

![Test a](image.png)

### b. Create a task without a title. Expected status 200 and html contains "title is required." PASSED

![Test b](image-1.png)

### c. Filter tasks. url should display index.php?q={filter}&priority={priority} test values-cat and no priority, high priority. PASSED

![Test c](image-2.png)
![Test c](image-3.png)

### d. Delete a task. Should return a 302 status code and update the page without the deleted task. Test: Delete test task PASSED

Before:
![Before](image-4.png)

After:
![After](image-5.png)

### e. Complete a task. Should return a 302 status code and there will be a line through the task. Flash message will display that the task is completed. PASSED

![Test e](image-6.png)
![Test e flash message](image-7.png)

### f. Empty task list. The page should should no tasks and display a hyperlink where tasks would be, with a redirect to the new task page.

![Test f](image-8.png)

## Automated Tests output:

[PASS] TC01 - Happy Path
[PASS] TC02 - Missing title
[PASS] TC03 - Invalid priority
[PASS] TC04 - Invalid date format
[PASS] TC05 - Invalid date i.e. Aprill 33
[PASS] TC06 - Title > 200 characters
[PASS] TC07 - Valid task with optional fields left empty
[PASS] TC08 - Title with only spaces
[PASS] TC09 - Empty Priority
[PASS] TC10 - High priority task

Passed 10 out of 10 tests.
