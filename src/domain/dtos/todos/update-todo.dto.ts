export class UpdateTodoDto{

    private constructor(
        public readonly id:number,
        public readonly text?:string,
        public readonly complatedAt?:Date,
    ){
    }

    get values(){
        const returnObj :{[key:string]:any}= {};

        if (this.text) returnObj.text = this.text;
        if(this.complatedAt) returnObj.complatedAt = this.complatedAt;
        return returnObj;
    }


    static create(props:{[key:string]:any}):[string?,UpdateTodoDto?]{
        const {id,text,completedAt} = props;
        const newCompletdAt = completedAt;

        if(!id || isNaN(Number(id))){
            return ['id must be a valid number'];
        }

        if(completedAt){
            const newCompletdAt = new Date(completedAt);
            if(newCompletdAt.toString() === 'Invalid Date'){
                return ['CompletedAt must be a valid Date']
            }
        }

        return [undefined,new UpdateTodoDto(id,text,newCompletdAt)];
    }


}