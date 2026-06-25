Create AI-assisted comprehensive technical specification for $ARGUMENTS:

## Planning Phase
1. **Requirements Analysis**:
   - Parse and validate all functional requirements
   - Identify non-functional requirements (performance, security, scalability)
   - Map requirements to user stories with acceptance criteria
   - Use AI to identify missing or ambiguous requirements
   
2. **Architecture Design**:
   - Create system architecture diagram using Mermaid
   - Define microservices boundaries and communication patterns
   - Plan data flow and state management
   - Design for scalability (horizontal scaling strategy)
   - Include caching strategy (Redis/Memcached)
   - Plan for observability (logs, metrics, traces)
   
3. **Database Design**:
   - Schema design with normalization analysis
   - Index planning for query optimization
   - Data migration strategy (if needed)
   - Backup and recovery planning
   - Consider read/write splitting needs
   
4. **API Design**:
   - OpenAPI 3.1 specification
   - RESTful principles with proper HTTP methods
   - Pagination, filtering, and sorting strategies
   - Rate limiting and throttling design
   - Versioning strategy
   
5. **Security Planning**:
   - Authentication and authorization strategy
   - Data encryption at rest and in transit
   - API security (OAuth2, JWT, API keys)
   - Input validation and sanitization rules
   - CORS and CSP policies
   
6. **Testing Strategy**:
   - Unit test scenarios with mocking strategy
   - Integration test plan
   - E2E test user journeys
   - Performance test benchmarks
   - Security test scenarios
   - Chaos engineering experiments
   
7. **Rollout Strategy**:
   - Feature flag implementation
   - Canary deployment percentages
   - Rollback triggers and procedures
   - A/B testing configuration
   - Monitoring and alerting setup
   
8. **Cost Analysis**:
   - Infrastructure cost estimates
   - Scaling cost projections
   - Cost optimization opportunities
   - ROI calculations

## Output Requirements
- Generate `technical_spec_[feature].md` with all sections
- Create `architecture_diagram_[feature].mmd` (Mermaid)
- Generate `api_spec_[feature].yaml` (OpenAPI)
- Create `test_plan_[feature].md`
- Generate `rollout_plan_[feature].md`
- Create Jira tickets or GitHub issues for each component

## Success Criteria
- All edge cases identified
- Performance requirements defined
- Security measures specified
- Rollback plan included
- Cost estimates provided
