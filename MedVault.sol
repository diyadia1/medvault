// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedVault {
    struct MedicalRecord {
        string ipfsHash;
        uint256 timestamp;
        address addedBy;
    }

    mapping(address => MedicalRecord[]) private records;
    mapping(address => mapping(address => bool)) private doctorAccess;

    event RecordAdded(
        address indexed patient,
        string ipfsHash,
        address indexed addedBy
    );

    event DoctorAccessUpdated(
        address indexed patient,
        address indexed doctor,
        bool accessGranted
    );

    modifier onlyPatient(address patient) {
        require(msg.sender == patient, "Only patient can perform this action");
        _;
    }

    function addRecord(
        address patient,
        string memory ipfsHash
    ) external {
        require(
            msg.sender == patient || doctorAccess[patient][msg.sender],
            "Not authorized"
        );

        records[patient].push(
            MedicalRecord({
                ipfsHash: ipfsHash,
                timestamp: block.timestamp,
                addedBy: msg.sender
            })
        );

        emit RecordAdded(patient, ipfsHash, msg.sender);
    }

    function grantDoctorAccess(
        address doctor
    ) external onlyPatient(msg.sender) {
        doctorAccess[msg.sender][doctor] = true;

        emit DoctorAccessUpdated(msg.sender, doctor, true);
    }

    function revokeDoctorAccess(
        address doctor
    ) external onlyPatient(msg.sender) {
        doctorAccess[msg.sender][doctor] = false;

        emit DoctorAccessUpdated(msg.sender, doctor, false);
    }

    function hasDoctorAccess(
        address patient,
        address doctor
    ) external view returns (bool) {
        return doctorAccess[patient][doctor];
    }

    function getRecordCount(
        address patient
    ) external view returns (uint256) {
        return records[patient].length;
    }

    function getRecord(
        address patient,
        uint256 index
    ) external view returns (
        string memory ipfsHash,
        uint256 timestamp,
        address addedBy
    ) {
        require(
            msg.sender == patient || doctorAccess[patient][msg.sender],
            "Not authorized"
        );

        MedicalRecord memory record = records[patient][index];

        return (
            record.ipfsHash,
            record.timestamp,
            record.addedBy
        );
    }
}
