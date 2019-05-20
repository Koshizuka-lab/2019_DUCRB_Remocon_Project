module Model.Lights exposing (..)

import Http
import Material

type alias Model =
    { mdc : Material.Model Msg 
    , instance : String
    }

defaultModel : Model
defaultModel =
    { mdc = Material.defaultModel, instance = "default" }

type alias InstanceData =
    { instance : String, moment : String }

type alias Response =
    { cellName : String, paramName : String, data : List InstanceData }

init : () -> ( Model, Cmd Msg )
init _ =
    ( defaultModel, Material.init Mdc )

type Msg
    = Mdc (Material.Msg Msg)
    | KickTestServer
    | GotServerResponse (Result Http.Error Response)
