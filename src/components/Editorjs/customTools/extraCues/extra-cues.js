export default class ExtraCues {
  constructor({ data }) {
    this.data = data
  }
  static get toolbox() {
    return {
      name: 'Extra Cues',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="light-bulb"><path d="M17.45,12.46a7,7,0,0,0-1-9.83,7.09,7.09,0,0,0-5.92-1.4,7,7,0,0,0-4,11.15,4.76,4.76,0,0,1,1.08,2.86v.29A2,2,0,0,0,7,16.93v2a2,2,0,0,0,2,2v1a1,1,0,0,0,2,0v-1h2v1a1,1,0,0,0,2,0v-1a2,2,0,0,0,2-2v-2a2,2,0,0,0-.57-1.4V15.1A4.26,4.26,0,0,1,17.45,12.46ZM9,18.93v-2h6v2Zm6.89-7.72a6.18,6.18,0,0,0-1.46,3.72H9.56a6.67,6.67,0,0,0-1.5-3.78,5,5,0,0,1,2.84-8A5,5,0,0,1,17,8.07,4.92,4.92,0,0,1,15.89,11.21Z"></path></svg>'
    }
  }

  render() {
    const cueOptions = [
      'Hint',
      'MythBusters',
      'Fact',
      'Reference',
      'On your mind???',
      'DID you know???',
      'Tips and tricks',
      'Guide from experience',
      'What next???'
    ]

    const wrapper = document.createElement('div')
    wrapper.classList.add('extra-cues-wrapper')

    const imageInput = document.createElement('input')
    imageInput.placeholder = 'extra cues image url ...'

    const select = document.createElement('select')
    cueOptions.map((cueOption) => {
      const option = document.createElement('option')
      option.textContent = cueOption
      option.value = cueOption
      select.appendChild(option)
    })
    // default value
    select.value = 'Hint'

    const textarea = document.createElement('textarea')

    if (Object.keys(this.data).length !== 0) {
      imageInput.value = this.data.cueImage
      select.value = this.data.cueType

      textarea.value = this.data.cueInfo
    }

    wrapper.appendChild(select)
    wrapper.appendChild(imageInput)
    wrapper.appendChild(textarea)

    return wrapper
  }
  save(blockContent) {
    const selectedCueType = blockContent.querySelector('select').value
    const cueImgUrl = blockContent.querySelector('input').value
    const cueTextContent = blockContent.querySelector('textarea').value

    return {
      cueType: selectedCueType,
      cueImage: cueImgUrl,
      cueInfo: cueTextContent
    }
  }
}
