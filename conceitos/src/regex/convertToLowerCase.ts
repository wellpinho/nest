import { RegexProtocol } from './regex.protocol';

export class ConvertToLowerCaseRegex extends RegexProtocol {
  execute(str: string): string {
    // convert tudo para lowercase
    return str.replace(/[^a-z]/g, '');
  }
}
