import {Context, storage} from "near-sdk-core"


@nearBindgen
export class Contract {
    getLastMessage(accountId: string): string {
      const result = this.getLastHeart(accountId);
      
      if (result) {
        return result;
      }
        
      return  'Hello unknown';
    }

    @mutateState()
    greet(name: string, color: string): void {
        const lastResult = this.getLastHeart(Context.sender);

        let greeting = `Hello ${name}!`;
        const colorEmoji = this.getColorEmoji(color);
        
        greeting = `${greeting} here is your result for color ${color}: ${colorEmoji}`;

        if (lastResult) {
            greeting = `${greeting}| Last time you searched for ${lastResult}`;
        }

        this.recordLastHeart(Context.sender, greeting);
    }

    private getLastHeart(accountId: string): string | null {
        return storage.getString(accountId);
    }

    
    private recordLastHeart(accountId: string, message: string): void {
        storage.setString(accountId, message);
    }

    private getColorEmoji(value: string): string {
          if (value == "orange") { 
            return "🧡";
          }
          if (value == "yellow") { 
            return "💛";
          }
          if (value == "green") { 
            return "💚";
          }
          if (value == "blue") { 
            return "💙";
          }
          if (value == "pink") { 
            return "💜";
          }
          if (value == "black") { 
            return "🖤";
          }

          return "There's no hear for this color :( Please try again";
    }
}