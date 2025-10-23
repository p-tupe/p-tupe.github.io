import { execSync } from "child_process"

export default function modifiedTime(filepath: string) {
  return execSync(`git log -1 --pretty="format:%cI" "${filepath}"`).toString()
}
