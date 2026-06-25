Test complete user flows for $ARGUMENTS:

## End-to-End User Flow Testing

### 1. Critical User Journey Mapping
- New user registration → first value
- User login → main dashboard
- Core feature usage flow
- Purchase/subscription flow
- User settings/profile update
- Password reset flow
- User off-boarding/deletion
- Mobile app first-time use

### 2. Persona-Based Testing
- **Power User**: Complex workflows, shortcuts
- **New User**: Onboarding, tutorials
- **Mobile User**: Touch interactions, offline
- **Accessibility User**: Screen reader, keyboard
- **International User**: Language, currency
- **Enterprise User**: SSO, permissions
- **Free User**: Upgrade prompts, limits
- **Admin User**: Management features

### 3. Multi-Step Flow Validation
- Form progression saving
- Back button behavior
- Session timeout handling
- Multi-tab scenarios
- Bookmark/direct link access
- Interrupted flow recovery
- Cross-device continuity
- Offline/online transitions

### 4. State Management Testing
- Empty state experiences
- Loading state displays
- Error state handling
- Success confirmations
- Partial data states
- Pagination behavior
- Infinite scroll
- Real-time updates

### 5. Edge Case Scenarios
- Network interruption mid-flow
- Multiple simultaneous users
- Rapid clicking/tapping
- Browser back/forward
- Copy/paste behavior
- Drag and drop
- File upload interruption
- Payment processing timeout

### 6. Cross-Platform Testing
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome)
- Native mobile apps (iOS, Android)
- Tablet experiences
- Different screen resolutions
- Slow network conditions (3G)
- PWA functionality
- Email client rendering

### 7. Integration Points
- Social login flows
- Payment gateway integration
- Email verification
- SMS verification
- Third-party OAuth
- Webhook handling
- API rate limiting
- External service failures

### 8. Data Validation Flows
- Form field validation
- File upload validation
- Data import/export
- Bulk operations
- Search functionality
- Filter combinations
- Sort operations
- Data persistence

### 9. Performance Under Load
- Concurrent user testing
- Large data set handling
- Search performance
- Image/media loading
- API response times
- Database query optimization
- Cache effectiveness
- CDN performance

### 10. Error Recovery Testing
- Graceful error messages
- Retry mechanisms
- Data recovery options
- Rollback procedures
- Alternative path suggestions
- Support contact options
- Error logging accuracy
- User feedback collection

## Test Execution Framework
```gherkin
Feature: User Registration Flow
  Scenario: Successful registration
    Given I am on the registration page
    When I enter valid credentials
    And I verify my email
    Then I should see the welcome dashboard
    And I should receive a welcome email
```

## Automation Strategy
- Selenium/Cypress for web flows
- Appium for mobile apps
- API testing with Postman/Insomnia
- Visual regression with Percy
- Performance testing with K6
- Accessibility with Axe
- Cross-browser with BrowserStack
- Load testing with Locust

## Test Data Management
- Unique test accounts
- Cleanup procedures
- Test payment methods
- Sandbox environments
- Mock external services
- Realistic data sets
- Edge case data
- Performance data sets

## Output Requirements
- Generate flow_test_report.md
- Record test execution videos
- Capture screenshots at key points
- Document failure points
- Create bug tickets
- Update test cases
- Generate coverage report
- Create user feedback summary

## Success Metrics
- 100% critical paths tested
- < 2% test flakiness
- All personas covered
- Cross-platform verified
- Performance SLAs met
- Accessibility compliance
- No data loss
- Positive user feedback

## Continuous Testing
- Nightly regression runs
- Smoke tests on deploy
- Weekly full suite
- Monthly performance tests
- Quarterly accessibility audit
- Continuous monitoring
- Real user monitoring
- Synthetic monitoring

## Best Practices
- Test from user perspective
- Use realistic test data
- Document test scenarios
- Maintain test stability
- Review test effectiveness
- Update tests with features
- Share findings with team
- Celebrate quality wins

Remember: Think like a user, not a developer. The goal is to ensure delightful experiences across all user journeys.
