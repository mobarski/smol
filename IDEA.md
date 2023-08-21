



# Kompilacja

- **v1**: python -> js (interpret), wymaga spacji jako separatora
- xxx: python -> js (bytecode)
- xxx: static_language -> js (interpret)
- xxx: static_languge -> js (bytecode)
- xxx: python -> static language



# Decyzje

- tablice
  - natywne
  - nie



# Inspiracja

- Another World VM
- UXN VM
- Pascal p-code VM



# Polecenia

- Core:
  - **alu** A OP B
  - **if** A CMP B addr
  - **extension** X *
- Dodatek:
  - **goto** addr
  - **call** addr
  - **return**
  - **push** addr
  - **pop** addr



Rodzaj parametru

- 1 bajt:
  - rejestr
  - @ rejestr
  - unsigned
- X bajtów:
  - float (bfloat16, etc)



OP -> max 16 -> 4 bity

CMP -> max 8 -> 3 bity

A -> max 2 -> 1 bit

B -> max 8 -> 3 bity

