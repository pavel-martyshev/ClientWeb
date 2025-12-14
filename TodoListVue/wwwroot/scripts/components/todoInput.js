export const todoInput = {
    props: {
        placeholderText: {
            type: String,
            require: false,
            
        },
        wrapperClass: {
            type: String,
            require: false,
            default: ""
        },
        modelValue: {
            type: String,
            require: false,
            default: ""
        }
    },

    emits: ['update:modelValue'],

    template: `
    <div :class="wrapperClass">
        <textarea 
            class="form-control" 
            :placeholder="placeholderText"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">
        </textarea>
    </div>
    `
}