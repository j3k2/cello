# Cello 
Cello is a full-stack Trello clone built with Postgres, Node.js, and React. 

Features:
- Includes drag and drop lists and inline editing features of Trello
- Lightweight: No ORM for database queries, just Knex library for query building. No additional state management solution other than React Context
- User authentication with JWT and bcrypt password encryption
- React Context/hooks used to keep state logic separate from presentation components and prevent unnecessary prop drilling
- Styled-jsx as CSS-in-JS solution, letting scoped styles live in the same files as markup and logic
- Uses transactions for related database queries

To Do:
- Tests
- Animations and dragging styles
- Custom colors and backgrounds
- Multiple users/teams
- Activity feeds
- Archiving functionality
- Fully-featured cards (with dates, checklists, attachments, etc.)
- Routing for card details modals
- Markdown parsing for card descriptions
