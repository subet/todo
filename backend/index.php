<?php

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request = (isset($_SERVER['PATH_INFO']))
                ? explode('/', trim($_SERVER['PATH_INFO'], '/'))
                : [];
$input = json_decode(file_get_contents('php://input'), true);

$todosFile = 'todos.json';
$todos = json_decode(file_get_contents($todosFile), true);

switch ($method) {
    case 'GET':
        echo json_encode($todos);
        break;

    case 'POST':
        $newTodo = $input;
        $newTodo['id'] = end($todos['todos'])['id'] + 1;
        $todos['todos'][] = $newTodo;
        file_put_contents($todosFile, json_encode($todos));
        echo json_encode($newTodo);
        break;

    case 'PUT':
        $id = intval($request[0]);
        foreach ($todos['todos'] as &$todo) {
            if ($todo['id'] === $id) {
                $todo = array_merge($todo, $input);
                file_put_contents($todosFile, json_encode($todos));
                echo json_encode($todo);
                break;
            }
        }
        break;

    case 'DELETE':
        $id = intval($request[0]);
        $todos['todos'] = array_values(array_filter($todos['todos'], function ($todo) use ($id) {
            return $todo['id'] !== $id;
        }));

        file_put_contents($todosFile, json_encode($todos));
        echo json_encode(['deleted' => $id]);
        break;

    default:
        http_response_code(405);
        break;
}

?>
