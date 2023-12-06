
export const sidebarLinks = [
    {
      imgURL: "M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      route: "/create-post",
      label: "Create Post",
    },
    // {
    //   imgURL: "/assets/community.svg",
    //   route: "/communities",
    //   label: "Communities",
    // },
    {
      imgURL: "M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z",
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "liked", label: "Likes", icon: "/assets/heart-gray.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];

  export function formatTimeDifference(dateString) {
    const date = new Date(dateString);
    const now = new Date();
  
    const timeDifference = now.getTime() - date.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
      return `now`;
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days < 7) {
      return `${days}d`;
    } else if (weeks < 12) {
      return `${weeks}w`;
    } else {
      return `${years} years ago`;
    }
  }