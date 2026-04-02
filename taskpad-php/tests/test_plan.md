# **Test plan for task pad**

## 1. Run run_tests.php- This will output basic automated tests.

## 2. Manual tests to view status codes

### a. Create a valid task. Expected status 302 and redirect to index.php.

![Test a](image.png)

### b. Create a task without a title. Expected status 200 and html contains "title is required."

![Test b](image-1.png)
