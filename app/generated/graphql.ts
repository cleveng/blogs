import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  _FieldSet: { input: any; output: any }
}

export type Mutation = {
  login: Scalars['String']['output']
  signup: Scalars['String']['output']
}

export type MutationLoginArgs = {
  payload: Scalars['String']['input']
}

export type MutationSignupArgs = {
  payload: Scalars['String']['input']
}

export type Query = {
  hello: Scalars['String']['output']
}

export type QueryHelloArgs = {
  payload: Scalars['String']['input']
}

export type LoginMutationVariables = Exact<{
  input: Scalars['String']['input']
}>

export type LoginMutation = { login: string }

export type SignupMutationVariables = Exact<{
  input: Scalars['String']['input']
}>

export type SignupMutation = { signup: string }

export type HelloQueryVariables = Exact<{
  input: Scalars['String']['input']
}>

export type HelloQuery = { hello: string }

export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const SignupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Signup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signup' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>
export const HelloDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Hello' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'hello' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>
