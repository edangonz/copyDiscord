import React from 'react'
import Chat from './chat/Chat'
import Newmessage from './newmessage/Newessage'
import Visorimage from './Visor_Image'

export default class ContainerMessages extends React.Component{
    state = {
        dragging: false,
        url_image : undefined,
        url_visor_image : undefined,
        file : undefined
    }

    dropRef = React.createRef()

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        //console.log("1")
    }
    
    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()

        this.dragCounter++

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
            this.setState({dragging: true})
    }
    
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()

        this.dragCounter--
        if (this.dragCounter > 0) return
        this.setState({dragging: false})
    }
    
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
    
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            let temp_image = e.dataTransfer.files[0]
            if(temp_image && (temp_image.type === 'image/jpeg' || temp_image.type === 'image/png'))
                this.setState({url_image : URL.createObjectURL(temp_image), file : temp_image});
                
            e.dataTransfer.clearData()
            this.dragCounter = 0
        }

        this.setState({dragging: false})
    }

    selectImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
    
        let temp_image = e.target.files[0]
        if(temp_image && (temp_image.type === 'image/jpeg' || temp_image.type === 'image/png'))
            this.setState({url_image : URL.createObjectURL(temp_image), file : temp_image});
    }

    componentDidMount() {
        this.dragCounter = 0

        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    removeImage = () => {
        if(this.state.url_image)
            this.setState({ url_image : undefined, file : undefined})
    }

    openImage = (url_image) => {
        this.setState({url_visor_image: url_image})
    }

    render(){
        return(
            <div ref={this.dropRef} className={`${(this.state.dragging)? 'dragging': ''}`} >
                {this.state.url_visor_image && <Visorimage closeImage={this.openImage} url_image={this.state.url_visor_image}/>}
                <Chat openImage={this.openImage} url_image={this.state.url_image !== undefined}/>
                <Newmessage
                    url_image={this.state.url_image}
                    file={this.state.file}
                    selectImage={this.selectImage}
                    removeImage={this.removeImage}/>
            </div>
        );
    }
}