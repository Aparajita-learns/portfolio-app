import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { Project } from '@/types/project';

// COLLECTION NAME
const PROJECTS_COLLECTION = 'projects';

// Fetch all projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw error;
  }
};

// Add a new project
export const addProject = async (projectData: Omit<Project, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const newProject = {
      ...projectData,
      createdAt: Date.now(),
    };
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), newProject);
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Upload a file to Firebase Storage
export const uploadFile = async (file: File, folder: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
