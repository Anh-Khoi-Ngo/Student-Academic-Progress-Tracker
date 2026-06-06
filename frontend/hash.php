<?php

$passwords = [
    "example123",
    "supersecretpassword",
    "stevesquared"
];

foreach ($passwords as $p) {
    echo $p . " → " . password_hash($p, PASSWORD_DEFAULT) . "<br>";
}
