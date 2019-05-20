module Model exposing (Msg(..), Model, init)

import Material
import Model.Lights as Lights

type alias Model =
    { mdc : Material.Model Msg 
    , lightsModel : Lights.Model
    }

type alias Config =
    { api_url : String
    }

defaultModel : Model
defaultModel =
    { mdc = Material.defaultModel 
    , lightsModel = Lights.defaultModel }

type Msg
    = Mdc (Material.Msg Msg)
    | Click
    | LightsMsg Lights.Msg

init : ( Model, Cmd Msg )
init =
    ( defaultModel, Material.init Mdc )
