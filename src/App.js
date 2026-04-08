import './App.css';
import React,{Component} from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm'
import Rank from './component/Rank/Rank'
import FaceRecognition from './component/FaceRecognition/FaceRecognition'
import Register from './component/Register/Register';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import Signin from './component/Signin/Signin'

const CLARIFAI_FUNCTION_URL = '/.netlify/functions/clarifai';

// particles setting
const ParticlesOptions = {
  fullScreen: {
    enable: false
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800
      }
    },
    size: {
      value: 3
    },
    opacity: {
      value: 1
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      outModes: {
        default: 'bounce'
      },
      speed: 3
    }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: {
        enable: true
      }
    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      particlesReady: false,
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false
    }
  }

  async componentDidMount() {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    await initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });

    this.setState({ particlesReady: true });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: (1 - clarifaiFace.right_col) * width,
      bottomRow: (1 - clarifaiFace.bottom_row) * height
    }
  }

  setStateBox = (box) => {
    console.log(box)
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch(CLARIFAI_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [
          {
            data: {
              image: {
                url: this.state.input
              }
            }
          }
        ]
      })
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Clarifai request failed');
        }

        return data;
      })
      .then((response) => this.setStateBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn:false})
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageUrl, particlesReady, route, box } = this.state;
    return (
        <div className="App">
          {particlesReady && <Particles className="particles" options={ParticlesOptions} />}
          {/* <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/> */}
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' 
            ? <div>
                <Logo/>
                <Rank/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                {/* <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> */}
                <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
            : (
                route === 'signin'
                ? <Signin onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
              )
          }
        </div>
    );
  }
}

export default App;
