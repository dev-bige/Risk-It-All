package Testing;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;


public class SignUpTest {

    static WebDriver driver;

    static String pathChromeDriver = "C:/Users/Ethan Evans/Documents/SE 319/HW7/webdriver/chromedriver.exe";
    static String pathSignInPage = "C:\\Users\\Ethan Evans\\g43\\Frontend\\sign-up\\sign-up.html";

    String txtFirstName = "firstName";
    String txtLastName = "lastName";
    String txtEmail = "email";
    String txtUsername = "username";
    String txtPassword = "password";
    String txtPasswordRe = "re-enter";

    String btnSignUp = "buttonSignUp";
    String result = "error";
    String pResult = "Perror";

    @BeforeClass
    public static void openBrowser() {
        System.setProperty("webdriver.chrome.driver", pathChromeDriver);
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

    }

    @AfterClass
    public static void closeBrowser() {
        driver.quit();
    }

    @Test
    public void signUpSuccessTest() throws InterruptedException {
        driver.get(pathSignInPage);
        driver.manage().window().maximize();

        driver.findElement(By.xpath("//input[@id='"+txtFirstName+"']")).sendKeys("Ethan");
        driver.findElement(By.xpath("//input[@id='"+txtLastName+"']")).sendKeys("Evans");
        driver.findElement(By.xpath("//input[@id='"+txtEmail+"']")).sendKeys("ethan@gmail.com");
        driver.findElement(By.xpath("//input[@id='"+txtUsername+"']")).sendKeys("edevans");
        driver.findElement(By.xpath("//input[@id='"+txtPassword+"']")).sendKeys("password1");
        driver.findElement(By.xpath("//input[@id='"+txtPasswordRe+"']")).sendKeys("password1");

        Select dropdownExp = new Select(driver.findElement(By.name("experience")));
        dropdownExp.selectByValue("beginner");

        Thread.sleep(1000);
        driver.findElement(By.xpath("//button[@id='"+btnSignUp+"']")).click();

        String errorMessage = driver.findElement(By.xpath("//div[@id='"+result+"']")).getText();
        assertEquals("success", errorMessage, "");
    }

    @Test
    public void signUpInvalidFirstName() throws InterruptedException {
        driver.get(pathSignInPage);
        driver.manage().window().maximize();

        driver.findElement(By.xpath("//input[@id='"+txtFirstName+"']")).sendKeys("&");
        driver.findElement(By.xpath("//input[@id='"+txtLastName+"']")).sendKeys("Evans");
        driver.findElement(By.xpath("//input[@id='"+txtEmail+"']")).sendKeys("dummy@gmail.com");
        driver.findElement(By.xpath("//input[@id='"+txtUsername+"']")).sendKeys("edevans");
        driver.findElement(By.xpath("//input[@id='"+txtPassword+"']")).sendKeys("password1");
        driver.findElement(By.xpath("//input[@id='"+txtPasswordRe+"']")).sendKeys("password1");

        Select dropdownExp = new Select(driver.findElement(By.name("experience")));
        dropdownExp.selectByValue("beginner");

        Thread.sleep(1000);
        driver.findElement(By.xpath("//button[@id='"+btnSignUp+"']")).click();

        Thread.sleep(1000);
        String errorMessage = driver.findElement(By.xpath("//p[@id='"+pResult+"']")).getText();
        assertEquals("error", errorMessage, "Your first name is invalid, may only contain letters or numbers");
    }

    @Test
    public void signUpInvalidLastName() throws InterruptedException {
        driver.get(pathSignInPage);
        driver.manage().window().maximize();

        driver.findElement(By.xpath("//input[@id='"+txtFirstName+"']")).sendKeys("Ethan");
        driver.findElement(By.xpath("//input[@id='"+txtLastName+"']")).sendKeys("&");
        driver.findElement(By.xpath("//input[@id='"+txtEmail+"']")).sendKeys("dummy@gmail.com");
        driver.findElement(By.xpath("//input[@id='"+txtUsername+"']")).sendKeys("edevans");
        driver.findElement(By.xpath("//input[@id='"+txtPassword+"']")).sendKeys("password1");
        driver.findElement(By.xpath("//input[@id='"+txtPasswordRe+"']")).sendKeys("password1");

        Select dropdownExp = new Select(driver.findElement(By.name("experience")));
        dropdownExp.selectByValue("beginner");

        Thread.sleep(1000);
        driver.findElement(By.xpath("//button[@id='"+btnSignUp+"']")).click();

        Thread.sleep(1000);
        String errorMessage = driver.findElement(By.xpath("//p[@id='"+pResult+"']")).getText();
        assertEquals("error", errorMessage, "Your last name is invalid, may only contain letters or numbers");
    }

    @Test
    public void signUpDropDown() throws InterruptedException {
        driver.get(pathSignInPage);
        driver.manage().window().maximize();

        driver.findElement(By.xpath("//input[@id='"+txtFirstName+"']")).sendKeys("Ethan");
        driver.findElement(By.xpath("//input[@id='"+txtLastName+"']")).sendKeys("Evans");
        driver.findElement(By.xpath("//input[@id='"+txtEmail+"']")).sendKeys("dummy@gmail.com");
        driver.findElement(By.xpath("//input[@id='"+txtUsername+"']")).sendKeys("edevans");
        driver.findElement(By.xpath("//input[@id='"+txtPassword+"']")).sendKeys("password1");
        driver.findElement(By.xpath("//input[@id='"+txtPasswordRe+"']")).sendKeys("password1");

        Select dropdownExp = new Select(driver.findElement(By.name("experience")));
        dropdownExp.selectByValue("empty");

        Thread.sleep(1000);
        driver.findElement(By.xpath("//button[@id='"+btnSignUp+"']")).click();

        Thread.sleep(1000);
        String errorMessage = driver.findElement(By.xpath("//p[@id='"+pResult+"']")).getText();
        assertEquals("error", errorMessage, "You must select an option from the dropdown");
    }

    @Test
    public void InvalidPasswordMatch() throws InterruptedException {
        driver.get(pathSignInPage);
        driver.manage().window().maximize();

        driver.findElement(By.xpath("//input[@id='"+txtFirstName+"']")).sendKeys("Ethan");
        driver.findElement(By.xpath("//input[@id='"+txtLastName+"']")).sendKeys("Evans");
        driver.findElement(By.xpath("//input[@id='"+txtEmail+"']")).sendKeys("dummy@gmail.com");
        driver.findElement(By.xpath("//input[@id='"+txtUsername+"']")).sendKeys("edevans");
        driver.findElement(By.xpath("//input[@id='"+txtPassword+"']")).sendKeys("password1");
        driver.findElement(By.xpath("//input[@id='"+txtPasswordRe+"']")).sendKeys("password2");

        Select dropdownExp = new Select(driver.findElement(By.name("experience")));
        dropdownExp.selectByValue("beginner");

        Thread.sleep(1000);
        driver.findElement(By.xpath("//button[@id='"+btnSignUp+"']")).click();

        Thread.sleep(1000);
        String errorMessage = driver.findElement(By.xpath("//p[@id='"+pResult+"']")).getText();
        assertEquals("error", errorMessage, "Your passwords must match");
    }

    @Test public void EmailInUse() throws InterruptedException {
        driver.get(pathSignInPage);
        driver.manage().window().maximize();

        driver.findElement(By.xpath("//input[@id='"+txtFirstName+"']")).sendKeys("Ethan");
        driver.findElement(By.xpath("//input[@id='"+txtLastName+"']")).sendKeys("Evans");
        driver.findElement(By.xpath("//input[@id='"+txtEmail+"']")).sendKeys("ethan@gmail.com");
        driver.findElement(By.xpath("//input[@id='"+txtUsername+"']")).sendKeys("edevans");
        driver.findElement(By.xpath("//input[@id='"+txtPassword+"']")).sendKeys("password1");
        driver.findElement(By.xpath("//input[@id='"+txtPasswordRe+"']")).sendKeys("password1");

        Select dropdownExp = new Select(driver.findElement(By.name("experience")));
        dropdownExp.selectByValue("beginner");

        Thread.sleep(1000);
        driver.findElement(By.xpath("//button[@id='"+btnSignUp+"']")).click();

        Thread.sleep(1000);
        String errorMessage = driver.findElement(By.xpath("//p[@id='"+pResult+"']")).getText();
        assertEquals("error", errorMessage, "ethan@gmail.com already in use, try to login or reset password");
    }
}
