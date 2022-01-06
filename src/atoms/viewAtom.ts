import { atom } from "recoil";

// Current workflow to keep Sidebar and Player in sync with respective states:
// 1. User selects a 'view' from the sidebar ex: 'playlist', 'search', 'home', 'library', etc.
// 2. The viewAtom is updated with the view selected.
// 3. Conditionally render the component related to the view inside index.tsx

export const currentViewState = atom<string>({
	key: "currentViewState",
	default: "playlist",
});
