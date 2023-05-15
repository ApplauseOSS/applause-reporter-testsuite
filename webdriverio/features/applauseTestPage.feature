Feature: Test the attributes of a given element
    As a developer
    I want to be able to test the attributes of a given element

    Background:
        Given I open the site "/assets/sdktestpage.html"

    Scenario: "Test website is open"
        Then  I expect that the title contains "Test Page"

