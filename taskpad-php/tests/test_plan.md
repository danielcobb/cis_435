# **Test plan for task pad**

## 1. Run run_tests.php- This will output basic automated tests.

## 2. Manual tests to view status codes

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
