 ### Overview
This React project manages authentication and onboarding for both store owners and staff using the same signup and login endpoints. It implements separate session handling to ensure no conflicts between store owner and staff sessions.

### Key Features
- Role-based redirection to respective dashboards after login.
- Separate onboarding flow for staff through email invitations.
- Centralized session management to distinguish between store owner and staff sessions.

### Implementation Details
1. **Role Identification and Session Management:**
   - During login, the user role is determined from the API response and saved as a `userRole` in localStorage. 
   - This role is used to conditionally redirect users to their specific dashboard (e.g., store owner or staff).

2. **Onboarding Flow for Staff:**
   - Staff receive an invite link via email.
   - The link redirects to a registration page where they set their password.
   - After registration, they are redirected to the login page.

3. **Navigation and Route Protection:**
   - Role-based routes are implemented to prevent unauthorized access.
   - `ProtectedRoute` components check the `userRole` before rendering.

### Technical Details
- React Router is used for navigation.
- Redux is used for global state management.
- `userRole` is stored in localStorage to persist sessions across page reloads.
- React hooks are used for managing authentication states.

### Next Steps
- Implement error handling for role-based redirects.
- Optimize session persistence to handle edge cases like token expiration.

This update addresses the requirements for role-based navigation and session management, ensuring a smooth and secure user experience for both store owners and staff.
