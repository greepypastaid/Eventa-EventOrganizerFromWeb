<?php

namespace App\GraphQL\Scalars;

use GraphQL\Type\Definition\ScalarType;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Language\AST\Node;
use GraphQL\Error\Error;
use GraphQL\Error\InvariantViolation;

class DateTime extends ScalarType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'DateTime',
            'description' => 'A date and time, represented as an ISO-8601 string',
        ]);
    }

    public function serialize($value): string
    {
        if ($value instanceof \DateTimeInterface) {
            return $value->format(\DateTime::ATOM); // ISO 8601
        }

        if (is_string($value)) {
            try {
                $date = new \DateTime($value);
                return $date->format(\DateTime::ATOM);
            } catch (\Exception $e) {
                throw new InvariantViolation('Could not serialize value as DateTime: ' . $e->getMessage());
            }
        }

        throw new InvariantViolation('Could not serialize value as DateTime: ' . var_export($value, true));
    }

    public function parseValue($value): \DateTime
    {
        try {
            return new \DateTime($value);
        } catch (\Exception $e) {
            throw new Error('Could not parse value as DateTime: ' . $e->getMessage());
        }
    }

    public function parseLiteral(Node $valueNode, ?array $variables = null): \DateTime
    {
        if (!$valueNode instanceof StringValueNode) {
            throw new Error('Query error: DateTime must be a string.', [$valueNode]);
        }

        try {
            return new \DateTime($valueNode->value);
        } catch (\Exception $e) {
            throw new Error('Could not parse literal as DateTime: ' . $e->getMessage());
        }
    }
}
