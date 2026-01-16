import fs from 'fs/promises';
import path from 'path';

const MEMORY_DIR = path.join(process.cwd(), 'src', 'Memory');

export async function readMemory(agentName) {
  try {
    const filePath = path.join(MEMORY_DIR, `${agentName}Memory.md`);
    
    try {
        await fs.access(filePath);
    } catch {
        // If file doesn't exist, return empty string (or create it if you prefer, but append will create)
        return '';
    }
    
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(`Error reading memory for ${agentName}:`, error);
    return '';
  }
}

export async function writeMemory(agentName, userMessage, agentResponse) {
  try {
    const filePath = path.join(MEMORY_DIR, `${agentName}Memory.md`);
    const timestamp = new Date().toISOString();
    const entry = `
---
**Date:** ${timestamp}
**User:** ${userMessage}
**Agent:** ${agentResponse}
`;
    await fs.appendFile(filePath, entry, 'utf-8');
  } catch (error) {
    console.error(`Error writing memory for ${agentName}:`, error);
  }
}
