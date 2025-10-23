import { execSync } from "child_process"

export default function modifiedTime(filepath: string) {
  return execSync(`date -r "${filepath}"`).toString()
}
