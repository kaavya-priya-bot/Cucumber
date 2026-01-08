Feature: Login into SalesForce Application

  Scenario: Successful Login with Valid Credentials
    Given User is on Login page
    When User enters valid username and password
    And User clicks on Login button
    Then User is navigated to the Dashboard page