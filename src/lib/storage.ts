export interface Project {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  aiDesc: string;
  originalUrl: string;
  thumbnailUrl: string;
  modelUrl?: string;
  timestamp: number;
  isPublic: boolean;
  isDemo?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export const Storage = {
  getProjects: (): Project[] => {
    try {
      const data = localStorage.getItem('hously_projects');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  
  saveProject: (project: Project) => {
    const projects = Storage.getProjects();
    projects.push(project);
    localStorage.setItem('hously_projects', JSON.stringify(projects));
  },

  getProject: (id: string): Project | undefined => {
    return Storage.getProjects().find(p => p.id === id);
  },

  getUser: (): User | null => {
    try {
      const data = localStorage.getItem('hously_current_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem('hously_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hously_current_user');
    }
  }
};
