## Start
cd my-app\
npm install\

## Run the app
npm run dev

## Run tests
npx jest

## Technologies
- React
- Typescript 
- MateriaUI
- Tailwind
- Jest/React testing


## Comments:

I kept the default Vite project structure inside the src folder, which includes: App.tsx, main.tsx, index.css


Components folder (contains all the reusable components):
- Error snackbar 
- Users table
- Table search bar / toolbar
- Details dialog


Types:
- Is meant for reusable/shared types
- Component-specific types are inside the component files


Hooks:
- useDebounce: to avoid expensive rerenders when user is typing in search input - filtering users only once after typing 
- usePersistentState: saves state in localStorage so it persists even after a page reload
- useUsers: data fetching hook to keep the code clean


Tests: 
- Rendering the users table
- Clicking on View details button and opening the modal

## Improvements to consider
(especially when handling larger datasets and growing codebases)
- Initial loading on page (not only on api call)
- Add lazy loading
- More dynamic schemas / fields in tables
- Real server-side pagination: get data per page from api instead of fetching all data at once and separating in pages
- More mobile friendly
- Improve project structure - keep the codebase maintainable as it grows
- Add some helper comments 