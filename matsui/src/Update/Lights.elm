module Update.Lights exposing (..)

import Model.Lights as Lights exposing (Msg(..), Model, Response, InstanceData)
import Task exposing (Task)
import Http exposing (Error(..), get)
import List exposing (head)
import Json.Decode as Decode
import Material
import Debug

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ instance } as model) =
    case msg of
        KickTestServer ->
            ( model, Task.attempt GotServerResponse <| getTestServerResponse )
        GotServerResponse res ->
            case res of
                Ok rc ->
                    ( { model | instance = 
                            case (head <| rc.data) of
                                Just i -> i.instance
                                Nothing -> "nothing" }, Cmd.none )
                Err err ->
                    ( { model | instance = "Error: " ++ httpErrorToString err }, Cmd.none )
        Lights.Mdc m -> 
            ( model, Cmd.none )

getTestServerResponse : Task Http.Error Response
getTestServerResponse =
    Http.task
        { method = "GET"
        , headers = [ Http.header "Authorization:Basic" "a29zaGl6dWthTGFiOjhUeGdTNzNLbUc=" ]
        , url = "http://172.26.16.8/api/ducrbcontrol/light/a304/"
        , body = Http.emptyBody
        , resolver = jsonResolver responseDecoder
        , timeout = Just 1.0
        }

jsonResolver : Decode.Decoder a -> Http.Resolver Http.Error a
jsonResolver decoder =
    Http.stringResolver <|
        \response ->
            case response of
                Http.BadUrl_ url ->
                    Err (Http.BadUrl url)

                Http.Timeout_ ->
                    Err Http.Timeout

                Http.NetworkError_ ->
                    Err Http.NetworkError

                Http.BadStatus_ metadata body ->
                    Err (Http.BadStatus metadata.statusCode)

                Http.GoodStatus_ metadata body ->
                    case Decode.decodeString decoder body of
                        Ok value ->
                            Ok value

                        Err err ->
                            Err (Http.BadBody (Decode.errorToString err))

responseDecoder : Decode.Decoder Response
responseDecoder =
    Decode.map3 Response
        (Decode.field "cell_name" Decode.string)
        (Decode.field "param_name" Decode.string)
        (Decode.field "data" (Decode.list
            (Decode.map2 InstanceData
                (Decode.field "instance" Decode.string)
                (Decode.field "moment" Decode.string)))
        )


httpErrorToString : Http.Error -> String
httpErrorToString err =
    case err of
        BadUrl _ ->
            "BadUrl"

        Timeout ->
            "Timeout"

        NetworkError ->
            "NetworkError"

        BadStatus _ ->
            "BadStatus"

        BadBody s ->
            "BadBody: " ++ s
